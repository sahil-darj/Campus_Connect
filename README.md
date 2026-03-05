# 📌 CampusConnect – Event Aggregator Platform

CampusConnect is a full-stack MERN application designed to centralize and streamline event discovery for students, clubs, and faculty within a campus. The platform aggregates upcoming events, workshops, and activities into one user-friendly dashboard, enabling students to easily search, filter, and register for events.

---

## 🚀 Features
- 🔍 **Event Search & Filters** – Find events by category, date, or organizer.
- 📅 **Interactive Calendar** – View events in a monthly/weekly layout.
- 📝 **Event Creation & Management** – Organizers can post and edit events.
- 🔔 **Real-time Notifications** – Stay updated on new or upcoming events.
- 👥 **User Roles & Authentication** – Secure login for students and organizers.
- 📱 **Responsive Design** – Optimized for desktop and mobile devices.

---

## 🛠 Tech Stack
**Frontend:**
- React.js (with JSX & TSX support)
- Tailwind CSS / CSS Modules
- Vite (for fast bundling)

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas (Database)

**Authentication:**
- JWT (JSON Web Tokens)


## ⚡ Installation & Setup

### 1️⃣ Clone the repository
```bash

git clone https://github.com/yourusername/CampusConnect.git
cd CampusConnect
```
2️⃣ Install dependencies
For backend:
```
cd backend
npm install
```
For frontend:
```
cd ..
npm install
```
3️⃣ Configure Environment Variables
Create a .env file inside the backend/ folder and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
4️⃣ Run the application
Backend:
```
cd backend
npm start
```
Frontend:
```
cd ..
npm run dev
```
## Screenshot of Project

<p align="center">
  <img src="Screenshot of project/Home page.png" width="600" alt="Homepage">
</p>

<p align="center">
  <img src="Screenshot of project/Internship page.png" width="600" alt="internship page">
</p>

<p align="center">
  <img src="Screenshot of project/Dashboard.png" width="600" alt="dashboard">
</p>

## For more screenshot check out my screenshot folder...


## 📂 Folder Structure

project/

│── backend/

│ ├── models/

│ │ └── User.js
│ ├── node_modules/

│ ├── routes/

│ │ └── auth.js

│ ├── index.js
│ ├── package-lock.json
│ ├── package.json
│ └── .env
│
│── src/

│ ├── assets/

│ ├── components/

│ ├── contexts/

│ ├── data/
│ │ └── mockData.js

│ ├── pages/
│ ├── App.jsx
│ ├── App.tsx
│ ├── main.tsx
│ ├── index.css
│ └── vite-env.d.ts
│


│── .gitignore
│── README.md
│── package-lock.json
│── package.json
│── postcss.config.js
│── index.html


👨‍💻 Author
Sahil Darji
