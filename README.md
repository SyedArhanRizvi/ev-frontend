# ⚡ EV Charging Station Management App

A Full-Stack application to manage and visualize EV (Electric Vehicle) Charging Stations with **Authentication**, **Map Integration**, **Filters**, and **Deployment**.

This assignment was built using **Node.js, Express, MongoDB (Mongoose)** on the backend, and **React + Leaflet** on the frontend (Note: Originally Vue.js was mentioned, but React was chosen for flexibility and speed).


## 📁 Folder Structure

├── backend/ # Node.js + Express + MongoDB Backend
├── frontend/ # React + Leaflet Frontend
└── README.md # Project Documentation


## 🎯 Project Objective

Build a fully functional full-stack application with:

- ✅ Node.js & Express REST API
- ✅ JWT Authentication (Login / Signup)
- ✅ CRUD operations for charging stations
- ✅ MongoDB Database
- ✅ Protected Routes
- ✅ Frontend UI for interaction
- ✅ Map integration using Leaflet (OpenStreetMap)
- ✅ Deployed on cloud (Vercel & Render)

## 🚀 Tech Stack

| Part         | Tech Used                         |
|--------------|-----------------------------------|
| Backend      | Node.js, Express.js, MongoDB, JWT |
| Frontend     | React.js, React Leaflet           |
| Map API      | OpenStreetMap + Leaflet.js        |
| Deployment   | Render (Backend), Vercel (Frontend) |

## 🔐 Backend Features (`/backend`)

### 📦 APIs (Protected with JWT)

| Method | Endpoint                           | Description                      |
|--------|------------------------------------|----------------------------------|
| POST   | `/api/auth/register`               | Register a new user              |
| POST   | `/api/auth/login`                  | Login user, returns JWT token    |
| POST   | `/api/charging-station/create`     | Create a new charging station    |
| GET    | `/api/charging-station/get-all`    | List all stations                |
| PUT    | `/api/charging-station/update/:id` | Update a charging station        |
| DELETE | `/api/charging-station/delete/:id` | Delete a station                 |

### 🔒 Authentication (JWT)

- Protected routes using `verifyToken` middleware.
- Password hashing with `bcrypt`.
- Token stored on client-side (localStorage).

### ⚡ Charging Station Schema

{
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  status: String, // Active / Inactive
  powerOutput: String,
  connectorType: String
}
💻 Frontend Features (/frontend)
📌 Pages
Login Page: User logs in with JWT token auth.

Charger Listing Page:

List of all chargers

Filter by status, power output, connector type

Edit / Delete / Add station

Map View:

Shows all stations on interactive map

Clickable markers show full details

"Get Direction" button displays route from current location to selected station (via Leaflet Routing)

🗺️ Map Functionality
Map renders via Leaflet + React Leaflet

User's current location fetched via navigator.geolocation

Routing (Directions) integrated using leaflet-routing-machine

⚙️ How to Run Locally
1. Clone the Repository
git clone https://github.com/SyedArhanRizvi/ev-frontend.git 
git clone https://github.com/SyedArhanRizvi/ev-backend.git

cd ev-charging-assignment


2. Backend Setup
cd backend
npm install
Create a .env file:

ini
Copy
Edit
PORT=3000
MONGO_URI=mongodb+srv://assignments:vwtMvQtSiQakMxQX@cluster01.t0zhlks.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster01
JWT_SECRET="QWERTYUIOPASDFGHJKLZXCVBNM123654789/*-+!@#$%^&*(0=zxcvbbnm,.lkjhgfdsaqwertyuiop><}{"
bash
Copy
Edit
npm run dev


3. Frontend Setup
cd frontend
npm install
npm run dev
🌍 Deployment Links
Service	URL
🔗 Frontendhttps://ev-frontend-flax.vercel.app
🔗 Backend	https://ev-backend-1-p454.onrender.com

📆 5-Day Timeline
Day	Task
1	Setup backend + CRUD + Auth APIs
2	Frontend login + charger listing page
3	Map view with directions
4	Testing + Deployment
5	Final documentation and submission

Deliverables
 GitHub Repo with /backend and /frontend

 Working APIs (Postman collection included)

 Frontend with Map, Filters, and UI

 Publicly deployed app

🙌 Author
Arhan Rizvi
Full Stack Web Developer
GitHub (https://github.com/SyedArhanRizvi) | LinkedIn (www.linkedin.com/in/ꜱʏᴇᴅ-ᴀʀʜᴀɴ-ʀɪᴢᴠɪ)

