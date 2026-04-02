# EcoTrack – Smart Waste Management System

## Overview
EcoTrack helps users manage waste efficiently, promote recycling, and keep cities clean. It features user authentication, waste reporting, smart classification, pickup scheduling, recycling awareness, rewards, admin panel, notifications, and a modern eco-friendly UI.

## Tech Stack
- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB

## Features
- User authentication (User, Admin, Collector roles)
- Dashboard with stats and impact
- Waste reporting with image upload and location
- Smart waste classification (placeholder logic)
- Pickup scheduling and tracking
- Recycling tips and educational content
- Rewards and leaderboard
- Admin panel for management
- Notifications for updates

## Running Locally

### Prerequisites
- Node.js
- MongoDB

### Backend
1. `cd server`
2. `npm install`
3. Copy `.env.example` to `.env` and set your MongoDB URI and JWT secret
4. `npm run dev`

### Frontend
1. `cd client`
2. `npm install`
3. `npm start`

The frontend runs on `http://localhost:3000` and backend on `http://localhost:5000`.

## API Routes
- `/api/auth/signup` – User registration
- `/api/auth/login` – User login
- `/api/reports` – Waste reporting
- `/api/pickups` – Pickup scheduling
- `/api/admin/*` – Admin endpoints

## Sample Data
- Use the signup form to create users
- Report waste via dashboard

## Notes
- Image classification uses placeholder logic (can be replaced with AI)
- Tailwind CSS for eco-friendly UI
- Mobile responsive design

---

*Built for sustainability and smarter cities.*
