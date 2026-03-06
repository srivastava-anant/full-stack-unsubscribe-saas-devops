
# 🚀 Unsubscribe SaaS - Full Stack DevOps Project

A **full-stack SaaS application** that helps users manage and unsubscribe from unwanted email subscriptions.

This project demonstrates **end-to-end DevOps practices**, including containerization, CI/CD automation, reverse proxy configuration, and Kubernetes orchestration.

The application is built with a **React frontend, Node.js backend, MongoDB database**, and deployed using **Docker, Kubernetes, and Jenkins CI/CD pipelines**.

---

# 🧠 Key Features

* Manage and track email subscriptions
* Unsubscribe from unwanted services
* REST API backend
* MongoDB persistent database
* Containerized services using Docker
* Reverse proxy routing with Nginx
* Kubernetes deployment with services and namespace isolation
* Automated CI/CD pipeline using Jenkins

---

# 🏗️ System Architecture

The system follows a **three-tier architecture**.

```
             User
               │
               ▼
        NodePort Service
               │
               ▼
        Frontend (React + Nginx)
               │
          /api requests
               │
               ▼
        Backend API (Node.js)
               │
               ▼
          MongoDB Database
```

### Components

**Frontend**

* React application
* Served through Nginx
* Sends API requests to backend

**Backend**

* Node.js + Express API
* Handles unsubscribe logic
* Communicates with MongoDB

**Database**

* MongoDB
* Stores user subscription data

---

# 🛠️ Tech Stack

## Frontend
- HTML
- CSS
- JavaScript
- React
- Nginx

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### DevOps & Infrastructure

* Docker
* Docker Compose
* Kubernetes
* Jenkins (CI/CD)
* Nginx Reverse Proxy
* GitHub

---

# 📂 Project Structure

```
full-stack-unsubscribe-saas-devops
│
├── backend
│   ├── models
│   ├── routes
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── index.HTML
│   ├── nginx.conf
│   └── package.json
│
├── k8s
│   ├── namespace.yaml
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── mongodb-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-service.yaml
│   └── mongodb-service.yaml
│
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

---

# 🐳 Docker Setup

The application services are containerized using Docker.

### Build Docker Images

```
docker-compose build
```

### Start Containers

```
docker-compose up
```

This starts:

* frontend container
* backend container
* mongodb container

### Stop Containers

```
docker-compose down
```

---

# ☸️ Kubernetes Deployment

The application can be deployed using Kubernetes for scalable container orchestration.

### 1️⃣ Create Namespace

```
kubectl apply -f k8s/namespace.yaml
```

---

### 2️⃣ Deploy All Components

```
kubectl apply -f k8s/
```

---

### 3️⃣ Check Pods

```
kubectl get pods -n unsubscribe
```

---

### 4️⃣ Check Services

```
kubectl get svc -n unsubscribe
```

---

### 5️⃣ Access the Application

The frontend is exposed using a **NodePort service**.

```
http://<Node-IP>:<NodePort>
```

---

# 🔗 Service Communication

Kubernetes services communicate using internal DNS.

Example connections:

Frontend → Backend

```
http://backend:5001/api
```

Backend → MongoDB

```
mongodb://mongodb:27017/unsubscribe
```

---

# ⚙️ CI/CD Pipeline with Jenkins

A Jenkins pipeline is configured to automate the build and deployment process.

### Pipeline Stages

1. Pull latest code from GitHub
2. Build Docker images
3. Run Docker containers
4. Deploy application to Kubernetes

Example Jenkins pipeline flow:

```
GitHub Push
     │
     ▼
  Jenkins
     │
 Build Docker Images
     │
 Deploy to Kubernetes
     │
 Application Updated
```

This pipeline ensures that **every code change can be automatically built and deployed**.

---

# 📊 Database

MongoDB stores all subscription information.

Connection string used by backend:

```
mongodb://mongodb:27017/unsubscribe
```

A **seed script** is included to insert sample data.

```
node seed.js
```

---


---

# 📌 Learning Outcomes

Through this project, the following concepts were implemented:

* Building a full-stack application
* Containerizing applications using Docker
* Service orchestration with Kubernetes
* Reverse proxy configuration using Nginx
* Automating deployments with Jenkins CI/CD
* Managing multi-container environments

---


