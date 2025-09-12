# 🗳️ Voting System Web Application

A full-stack **Voting System** built with **React (frontend)** and **Node.js + Express + MongoDB (backend)**.  
This project allows users to participate in elections, view live results, and ensures secure and transparent vote management.

---

## 🚀 Features

- 🔐 **Authentication**
  - Register & Login with secure password hashing
  - Role-based access: **Admin** & **Voter**

- 🧑‍🤝‍🧑 **Candidate Management**
  - Admin can add, edit, and delete candidates
  - Candidate profiles with details & party info

- 🗳️ **Voting System**
  - Each voter can cast **only one vote**
  - Prevents duplicate voting

- 📊 **Live Results**
  - Total votes, total candidates, winner display
  - Bar charts & flow charts for visualization
  - Percentage breakdown with progress bars

- 📱 **Responsive UI**
  - Built with **Tailwind CSS**
  - Optimized for both desktop & mobile

---

## 🛠️ Tech Stack

**Frontend**
- ⚛️ React  
- 🎨 Tailwind CSS  
- 📊 Recharts (Charts & Graphs)  
- 🎭 Framer Motion (Animations)  

**Backend**
- 🟢 Node.js  
- 🚂 Express.js  
- 🍃 MongoDB + Mongoose  
- 🔑 JWT (Authentication)  
- 🔒 bcrypt.js (Password hashing)  

---

## 📂 Project Structure
```bash
Voting-System/
│── voting-frontend/        # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Pages (Login, Dashboard, Results, etc.)
│   │   └── App.js          # App routes
│
│── voting-backend/         # Node.js backend
│   ├── models/             # Mongoose models (User, Candidate, Election)
│   ├── routes/             # API routes
│   └── server.js           # Backend entry point
│
└── README.md
```


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Harsh-Koundal/Voting-System.git
cd voting-system
```

---

### 2️⃣ Backend Setup
```bash
cd voting-backend
npm install
```
Create a .env file in voting-backend/
```bash
PORT=5000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd ../voting-frontend
npm install
npm start
```



