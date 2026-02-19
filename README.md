# ProDev FE Interactive Job Board Platform

ProDev FE is a professional, responsive, and feature-rich job board application designed for frontend developers and designers. This project demonstrates advanced frontend techniques including API integration, global state management with Context API, and accessible UI design.

## 🚀 Features

- **Dynamic Job Listings**: Fetches real-time job data from a Node.js/Express backend.
- **Advanced Filtering**: Filter jobs by Category, Location, and Experience Level.
- **Interactive Job Details**: Modal-based view for job descriptions and requirements.
- **Accessible Application Form**: Fully validated and ARIA-compliant form for job submissions.
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile devices using Tailwind CSS.
- **Global State**: Managed seamlessly via React Context API.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons.
- **Backend**: Node.js, Express.
- **Database**: SQLite (via `better-sqlite3`).
- **Build Tool**: Vite.

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/prodev-fe-job-board.git
cd prodev-fe-job-board
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (refer to `.env.example`):
```env
APP_URL="http://localhost:3000"
```

### 4. Run the application
Start the full-stack development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## 🔌 API Documentation

The backend provides the following endpoints:

### `GET /api/jobs`
Fetches job listings with optional filtering.
- **Query Params**:
  - `category`: (e.g., "Engineering", "Design")
  - `location`: (e.g., "Remote", "Austin, TX")
  - `experience`: (e.g., "Senior", "Entry-Level")
- **Response**: Array of Job objects.

### `POST /api/apply`
Submits a job application.
- **Body**:
  ```json
  {
    "jobId": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "coverLetter": "I am excited about this role..."
  }
  ```
- **Response**: Success message or error details.

## 📂 Project Structure

```text
├── src/
│   ├── components/      # Reusable UI components (JobCard, Modal, etc.)
│   ├── context/         # Global state management (JobContext)
│   ├── types.ts         # TypeScript interfaces and types
│   ├── App.tsx          # Main application layout and routing
│   └── index.css        # Tailwind CSS and global styles
├── server.ts            # Express server and SQLite database setup
├── jobs.db              # SQLite database file (generated on first run)
└── package.json         # Project dependencies and scripts
```

## 📄 License

This project is licensed under the Apache-2.0 License.

