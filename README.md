# Salarite Virtual HR Platform

## Project Overview
This project is the foundation for Salarite's Virtual HR + ATS platform, built as a full-stack application supporting real-time (auto-refresh) task tracking and interview scheduling between an Employer and a Virtual HR.

## Features
- **Employer Dashboard**: Assign tasks and monitor Real-time task progress via auto-refresh polling (every 5s).
- **Virtual HR Dashboard**: Receive assignments, update task status dynamically, schedule candidate interviews.
- **Interview Scheduling**: Create interviews with specific modes (Video, Voice, Chat) and open a visual placeholder for each.
- **REST API**: Built with FastAPI and connects optimally for fast response.
- **Database**: Integrated with MySQL database, easily configurable via `.env`.

## Tech Stack
**Frontend**: Next.js (React), Tailwind CSS, TypeScript, Axios
**Backend**: Python, FastAPI, SQLAlchemy
**Database**: MySQL
**Deployment Readiness**: Configured with `.env.example`s for seamless Render/Railway deployment.

## Project Structure
```
project/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/ (task, interview)
│   │   ├── schemas/ (task, interview)
│   │   └── routes/ (task, interview)
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── app/ (employer, virtual-hr, interview)
│   ├── lib/ (api calls)
│   └── package.json
│
├── README.md
└── .gitignore
```

## Setup Instructions

### 1. MySQL Setup
Ensure your MySQL server is running locally or deployed.
Create a database, e.g. `salarite_db`.
```sql
CREATE DATABASE salarite_db;
```
Configure your connection string in `backend/.env`.

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/Scripts/activate # Windows
   ```
3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy `.env.example` to `.env` and adjust the `DATABASE_URL`.
   ```bash
   cp .env.example .env
   ```
5. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
*(Note: FastAPI and SQLAlchemy will automatically create the required database tables `tasks` and `interviews` on startup.)*

### 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` if your backend is hosted on a different URL.
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. View the dashboard at `http://localhost:3000`.

## Environment Variables
**Backend (.env)**
`DATABASE_URL` = `mysql+pymysql://user:password@localhost:3306/salarite_db`
`FRONTEND_URL` = `http://localhost:3000`

**Frontend (.env.local)**
`NEXT_PUBLIC_API_URL` = `http://localhost:8000`

## Demo Credentials (Authentication Placeholder)
There is no explicit Auth implementation (login/signup) per requirements. All dashboards are directly accessible through standard navigation links on the home page for demonstration ease.

## Live Demo

- **Live Application:** https://salarite-virtual-hr-frontend-aner.onrender.com/
- **Backend API:** https://salarite-virtual-hr-1.onrender.com/
- **Backend API Docs:** https://salarite-virtual-hr-1.onrender.com/docs

## Final Demo Workflow
1. Employer opens `https://salarite-virtual-hr-frontend-aner.onrender.com/employer`.
2. Employer creates and assigns a task.
3. Task is saved in MySQL via FastAPI.
4. Virtual HR opens `https://salarite-virtual-hr-frontend-aner.onrender.com/virtual-hr`.
5. Virtual HR sees the assigned task.
6. Virtual HR changes task status from "Pending" to "In Progress".
7. Employer dashboard automatically shows the updated status.
8. Virtual HR opens interview scheduling from their dashboard.
9. Virtual HR enters candidate details, date, time.
10. Virtual HR selects Voice, Video or Chat mode.
11. Interview is scheduled, saved and displayed.
12. Clicking "Join Video Interview Placeholder" opens the simulation view.
