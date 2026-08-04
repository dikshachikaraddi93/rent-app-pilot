# 🏠 Rent Collection & Property Management System

A full-stack web application designed to simplify rental property management by allowing landlords and property managers to manage properties, tenants, rent payments, and reports from a single dashboard.

---

## 🚀 Features

### 📊 Dashboard
- Interactive dashboard
- Total Properties
- Total Tenants
- Total Payments
- Total Revenue
- Revenue Analytics
- Payment Status Charts
- Recent Payments
- Quick Summary
- Search functionality

### 🏢 Property Management
- Add Property
- Update Property
- Delete Property
- View All Properties

### 👥 Tenant Management
- Add Tenant
- Update Tenant
- Delete Tenant
- Assign Tenant to Property
- Lease Information
- Rent Due Date

### 💳 Payment Management
- Record Rent Payment
- Payment History
- Payment Status
- Payment Modes
- Payment Remarks

### 📈 Reports
- Revenue Reports
- Payment Reports
- Property Statistics

### ⚙️ Settings
- Update Profile
- Change Password
- Dark Mode
- Logout
- Notification Settings

### 🔐 Authentication
- User Registration
- Login
- Protected Routes
- Local Storage Authentication

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Material UI (MUI)
- React Router DOM
- Axios
- Recharts

## Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs

## Database
- MySQL

## Tools
- IntelliJ IDEA
- VS Code
- Postman
- Maven
- Git
- GitHub

---

# 📂 Project Structure

```
rent-app-pilot
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   └── config
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🗄️ Database Design

## Property

- id
- propertyName
- propertyType
- address
- totalUnits
- occupiedUnits
- monthlyRent

## Tenant

- id
- fullName
- phoneNumber
- email
- aadhaarNumber
- monthlyRent
- securityDeposit
- leaseStartDate
- leaseEndDate
- dueDate
- paymentStatus
- propertyId

## Payment

- id
- amount
- paymentDate
- paymentMode
- paymentStatus
- remarks
- tenantId

---

# 🔗 Entity Relationship

```
Property
    │
    │ One
    ▼
Tenant
    │
    │ One
    ▼
Payment
```

---

# 📡 REST APIs

## Property APIs

| Method | Endpoint |
|---------|----------|
| GET | /properties |
| GET | /properties/{id} |
| POST | /properties |
| PUT | /properties/{id} |
| DELETE | /properties/{id} |

---

## Tenant APIs

| Method | Endpoint |
|---------|----------|
| GET | /tenants |
| GET | /tenants/{id} |
| POST | /tenants |
| PUT | /tenants/{id} |
| DELETE | /tenants/{id} |

---

## Payment APIs

| Method | Endpoint |
|---------|----------|
| GET | /payments |
| GET | /payments/{id} |
| POST | /payments |
| PUT | /payments/{id} |
| DELETE | /payments/{id} |

---

# ▶️ Installation

## Clone Repository

```bash
git clone https://github.com/dikshachikaraddi93/rent-app-pilot.git
```

---

## Backend

```bash
cd backend
```

Configure MySQL in:

```
application.properties
```

Run

```bash
mvn spring-boot:run
```

Backend URL

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 📷 Screenshots

- Dashboard
- Login
- Register
- Property Management
- Tenant Management
- Payment Management
- Reports
- Settings

(Add screenshots here after deployment.)

---

# 🌟 Future Enhancements

- JWT Authentication
- Role-Based Access Control
- Email Notifications
- SMS Alerts
- PDF Report Export
- Excel Export
- Online Rent Payment Integration
- Mobile Responsive UI
- Cloud Deployment
- AI-Based Rent Prediction

---

# 📄
This project is developed for educational and portfolio purposes.
