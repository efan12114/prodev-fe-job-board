import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("jobs.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    salary TEXT,
    description TEXT,
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id INTEGER,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    resume_url TEXT,
    cover_letter TEXT,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
  );
`);

// Seed Data if empty
const jobCount = db.prepare("SELECT COUNT(*) as count FROM jobs").get() as { count: number };
if (jobCount.count === 0) {
  const insert = db.prepare(`
    INSERT INTO jobs (title, company, location, category, experience_level, salary, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const seedJobs = [
    ["Senior Frontend Engineer", "TechFlow", "Remote", "Engineering", "Senior", "$140k - $180k", "Lead the development of our core React applications."],
    ["Junior UI Designer", "CreativeCo", "New York, NY", "Design", "Entry-Level", "$70k - $90k", "Help us craft beautiful user interfaces for our clients."],
    ["Product Manager", "ScaleUp", "San Francisco, CA", "Management", "Mid-Level", "$120k - $150k", "Drive product strategy and execution for our growth team."],
    ["Full Stack Developer", "DataViz", "Remote", "Engineering", "Mid-Level", "$110k - $140k", "Build end-to-end features using React and Node.js."],
    ["Marketing Specialist", "BrandBoost", "Austin, TX", "Marketing", "Entry-Level", "$60k - $80k", "Execute digital marketing campaigns and analyze performance."],
    ["Staff Software Engineer", "CloudScale", "Remote", "Engineering", "Senior", "$180k - $220k", "Architect scalable cloud infrastructure and mentor junior engineers."],
    ["UX Researcher", "UserFirst", "Seattle, WA", "Design", "Mid-Level", "$100k - $130k", "Conduct user research to inform product design decisions."],
    ["DevOps Engineer", "OpsMaster", "Remote", "Engineering", "Mid-Level", "$130k - $160k", "Manage CI/CD pipelines and cloud infrastructure."],
  ];

  for (const job of seedJobs) {
    insert.run(...job);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/jobs", (req, res) => {
    try {
      const { category, location, experience } = req.query;
      let query = "SELECT * FROM jobs WHERE 1=1";
      const params: any[] = [];

      if (category && category !== "All") {
        query += " AND category = ?";
        params.push(category);
      }
      if (location && location !== "All") {
        query += " AND location = ?";
        params.push(location);
      }
      if (experience && experience !== "All") {
        query += " AND experience_level = ?";
        params.push(experience);
      }

      query += " ORDER BY posted_at DESC";
      const jobs = db.prepare(query).all(...params);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.post("/api/apply", (req, res) => {
    try {
      const { jobId, fullName, email, coverLetter } = req.body;
      if (!jobId || !fullName || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const insert = db.prepare(`
        INSERT INTO applications (job_id, full_name, email, cover_letter)
        VALUES (?, ?, ?, ?)
      `);
      insert.run(jobId, fullName, email, coverLetter);

      res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit application" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
