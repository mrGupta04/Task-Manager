# Task-Manager
Overview

Task Manager is a full-stack web application designed to help users efficiently manage their tasks. It provides a user-friendly interface, authentication, task tracking, and email notifications for due tasks.

Features

User authentication (signup, login, and profile management)

Task management (create, update, delete, and view tasks)

Task status tracking (Pending, In Progress, Done)

Email notifications for due tasks

Secure JWT-based authentication

Technology Stack

Frontend:

React.js

HTML, CSS, typescript

Axios for API requests

Backend:

Node.js with Express.js

PostgreSQL as the database

pgAdmin for database management

Nodemon for backend development

JSON Web Token (JWT) for authentication

Nodemailer for email notifications

Frontend Setup

Navigate to the frontend directory:

cd task-management-frontend

Install dependencies:

npm install

Start the development server:

npm start

Backend Setup

Navigate to the backend directory:

cd task-management-backend

Install dependencies:

npm install

Start the backend server:

npx nodemon

PORT=5000
DATABASE_URL=postgresql://postgres:dolphin@localhost:5432/TaskManager/change this with your database url
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_16_digit_app_password
JWT_SECRET=1e542f7d92d88c6d946c17dcdad3455d798ead6c7b8e1302c7ae2407015fbd71

run below in pgadmin to create table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mobile_number VARCHAR(15) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    profile_pic TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    due_date TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
