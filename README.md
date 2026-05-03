# 🎓 Student Life Organizer

A comprehensive academic management platform for university students to organize tasks, notes, schedules, exams, and study plans in one place.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.5-61dafb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-2.x-3ecf8e)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [User Guide](#user-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 1. Task & Assignment Manager
- Create, read, update, and delete tasks
- Set due dates and descriptions
- Mark tasks as complete/incomplete
- Automatic notifications for tasks due today

### 2. Smart Calendar
- Interactive monthly calendar view
- Color-coded indicators for tasks and exams
- Click on any date to view tasks and exams for that day
- Add exams/events directly from calendar view

### 3. Notes Management
- Create and save study notes
- Auto-save with timestamps
- Delete notes when no longer needed
- Clean card-based layout

### 4. Class Schedule
- Weekly class schedule by day
- Add classes with subject, day, and time
- Remove classes from schedule
- Separate sections for regular classes and exams

### 5. Study Planner
- Create weekly study sessions
- Set start and end times for each session
- Remove study sessions
- Built-in study tips and techniques

### 6. Dashboard Widgets
- Task completion progress bar
- Quick stats (total tasks, completed, classes, study sessions)
- Upcoming tasks and exams
- Daily motivational quotes with refresh option
- Today's schedule overview

### 7. Notification System
- Browser notifications for due tasks
- Exam day reminders
- Hourly automatic data refresh

## 🚀 Demo

**Live Demo:** [https://student-organizer.netlify.app](https://student-organizer.netlify.app)

**Test Credentials:**
- Mobile: `1234567890`
- Password: `password123`

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM 7** - Navigation
- **TailwindCSS** - Styling
- **Font Awesome** - Icons
- **Day.js** - Date manipulation
- **Axios** - API requests

### Backend & Database
- **Supabase** - PostgreSQL database & API
- Row Level Security (RLS) - Data protection

### Deployment
- **Netlify** - Frontend hosting

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account (free tier works)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/student-life-organizer.git
cd student-life-organizer