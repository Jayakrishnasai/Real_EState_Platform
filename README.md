# SSP Estates - Premium Real Estate Platform

SSP Estates is a cinematic, conversion-optimized real estate platform built with a modern tech stack. Inspired by premium design systems, it features high-end animations, interactive property discovery, and a robust full-stack architecture.

---

## 🚀 Key Features

- **Cinematic UI/UX**: High-performance, animated user interface built with Next.js, Framer Motion, and Tailwind CSS 4.
- **Interactive Maps**: Real-time property discovery using Leaflet for geographic exploration.
- **Full-Stack Performance**: Fast and scalable Node.js/Express backend with MongoDB/Mongoose.
- **Secure Authentication**: User management with JWT and bcrypt password hashing.
- **Dockerized Workflow**: Seamless local development and production-ready deployment with Docker Compose.
- **Nginx Reverse Proxy**: Integrated Nginx for high-performance traffic routing.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Maps**: Leaflet & React Leaflet
- **HTTP Client**: Axios

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Security**: JSON Web Tokens (JWT) & Bcrypt

### DevOps

- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx

---

## 🏃 Local Setup (Docker)

Ensure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jayakrishnasai/Real_EState_Platform.git
   cd Real_EState_Platform
   ```

2. **Start the application:**

   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - **Frontend**: [http://localhost](http://localhost) (via Nginx proxy)
   - **Backend API**: [http://localhost/api](http://localhost/api)
   - **MongoDB**: Exposed on `27017` for development.

---

## 📊 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check |
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/login` | User authentication |
| `GET` | `/api/properties` | Fetch property listings |
| `GET` | `/api/properties/:id` | Get single property details |
| `POST` | `/api/favorites` | Manage user favorites |

---

## 📁 Project Structure

```text
├── backend/            # Express, MongoDB, API routes
├── frontend/           # Next.js, Tailwind 4, UI Components
├── docker-compose.yml  # Multi-container orchestration
└── .gitignore          # Global ignore rules
```

---

## 📝 License

This project is licensed under the **ISC License**.

Created with ❤️ by **SSP EStates**
