
# 🚀 CampusHire – Job Application & Placement Portal

CampusHire is a **Spring Boot + React based placement portal** built as a polished **final-year student project**.

It helps:
- 🎓 Students create placement-ready profiles, explore jobs, and track applications  
- 🏢 Recruiters post jobs, review candidates, and manage hiring workflows  

---

## 📌 Project Overview

CampusHire simulates a **real campus placement system** without unnecessary complexity.

The focus is on:
- Clean user experience  
- Simple workflows  
- Practical, real-world functionality  

---

## ❗ Problem Statement

In many colleges:
- Placement processes are scattered across **forms, emails, spreadsheets**
- Students struggle to maintain a **single profile**
- Recruiters lack a **centralized system**

👉 CampusHire solves this by providing a **unified platform** for both students and recruiters.

---

## ✨ Key Features

- Student & Recruiter Authentication (JWT-based)
- Student Profile Management (resume, skills, academic details)
- Browse & Filter Jobs (role, location, skills, compensation)
- Job Application System with duplicate prevention
- Application Tracking (`Applied → Selected`)
- Recruiter Dashboard (job posting + applicant review)
- Real-time Status Updates
- Responsive UI (Mobile + Desktop)

---

## 👥 User Roles

### 🎓 Student
- Create profile
- Browse jobs
- Apply & track applications

### 🏢 Recruiter
- Post jobs
- View applicants
- Update status

### ⚙️ Admin
- Extended recruiter capabilities (backend-supported)

---

## 🔄 Project Flow

### Student Flow
1. Register / Login  
2. Complete profile  
3. Browse jobs  
4. Apply  
5. Track status  

### Recruiter Flow
1. Login  
2. Post job  
3. View applicants  
4. Update status  
5. Monitor dashboard  

---

## 🛠️ Tech Stack

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- Axios

### Backend
- Spring Boot
- Spring Data JPA
- PostgreSQL / H2
- JWT Authentication

---

## 🧱 Architecture

```

React Frontend
↓
Axios API Layer
↓
Spring Boot Controllers
↓
Service Layer
↓
Repository Layer
↓
Database (PostgreSQL / H2)

```

---

## ⚙️ Backend Modules

- `UserController` – Auth (login/register)
- `ProfileController` – Student profile
- `JobController` – Job operations
- `ApplicationController` – Apply & tracking
- `DashboardController` – Stats

---

## 📱 Frontend Pages

- Home
- Login / Signup
- Job Listings
- Job Details
- Student Dashboard
- Recruiter Dashboard
- Applications Tracker
- Profile Page

---

## 🗄️ Database Entities

- **User**
- **Profile**
- **Job**
- **Application**

---

## 🔗 API Overview

### Auth
```

POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

```

### Jobs
```

GET    /api/jobs
POST   /api/jobs
PUT    /api/jobs/{id}
DELETE /api/jobs/{id}

```

### Applications
```

POST /api/applications/jobs/{jobId}
GET  /api/applications/mine

````

---

## 🚀 Running the Project

### Backend

```bash
cd server
mvn spring-boot:run
````

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🌍 Environment Variables

### Backend

```
DATABASE_URL
DATABASE_USERNAME
DATABASE_PASSWORD
JWT_SECRET
```

### Frontend

```
VITE_API_URL=http://localhost:8080/api
```

---

## 📁 Project Structure

```
client/
server/
README.md
```

---

## 📸 Screenshots

*Add screenshots here after running locally*

---

## 🔮 Future Improvements

* Email notifications
* Resume upload feature
* Pagination & sorting
* Interview scheduling
* Admin analytics

---

## 🧾 Resume Summary

Built a **full-stack placement portal** using Spring Boot and React with:

* Role-based workflows
* Job application system
* JWT authentication
* Dashboard analytics
* Responsive UI

---

