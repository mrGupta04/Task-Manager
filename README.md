# ✅ Task Flow – Full Stack Task Manager  
![License](https://img.shields.io/badge/license-MIT-blue.svg)  
![Status](https://img.shields.io/badge/status-Completed-brightgreen)  
![React](https://img.shields.io/badge/Frontend-React.js-blue)  
![Node](https://img.shields.io/badge/Backend-Node.js-yellowgreen)  
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blueviolet)

> A modern full-stack task management web app to help users track and organize daily tasks with ease.

🌐 **Live Demo**: [task-flow-74km.onrender.com]([https://task-flow-74km.onrender.com/](https://task-flow-74km.onrender.com/))

---

## 🖼️ Preview

![Task Flow Preview](https://via.placeholder.com/1000x400?text=Task+Flow+App+Preview)

---

## 📆 Duration

**Jan 2025 – Mar 2025**

---

## ✨ Features

- ✅ Task creation, editing, and deletion with real-time updates  
- 🔐 Secure user authentication using JWT  
- 🧠 Personalized task lists scoped per user  
- 🌐 RESTful API with full CRUD operations  
- 📱 Fully responsive layout (mobile-first design)

---

## 🧰 Tech Stack

| Layer        | Tech                                |
|--------------|-------------------------------------|
| 🎨 Frontend   | React.js, CSS                       |
| ⚙️ Backend    | Node.js, Express.js                 |
| 🗃️ Database   | PostgreSQL, PGAdmin                 |
| 🔐 Auth       | JSON Web Tokens (JWT)               |
| 🚀 Hosting    | Render.com                          |

---

## 📁 Project Structure

\`\`\`
task-flow/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-based views
│   │   └── App.js
│   └── public/
├── server/          # Node/Express backend
│   ├── controllers/ # Business logic
│   ├── middleware/  # Auth, error handling
│   ├── models/      # DB schema (PostgreSQL)
│   ├── routes/      # API endpoints
│   └── index.js     # Main app entry
└── README.md
\`\`\`

---

## 🛠️ Setup Instructions

### 📦 Backend Setup

\`\`\`bash
cd server
cp .env.example .env   # Set DATABASE_URL and JWT_SECRET
npm install
npm start
\`\`\`

### 🎨 Frontend Setup

\`\`\`bash
cd client
npm install
npm start
\`\`\`

⚠️ **Note:** Ensure the backend server is running before launching the frontend.

---

## 🔐 .env Example

\`\`\`env
# PostgreSQL DB URL
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key
\`\`\`

---

## 👨‍💻 Developer Role

**Full Stack Developer**

- 🧱 Built secure REST APIs with Express.js  
- 🗃️ Integrated PostgreSQL for efficient data operations  
- 🔐 Implemented JWT-based authentication and task scoping  
- 🎨 Designed a responsive frontend using React.js
