# Task API – Assignment 3

A RESTful Task Management API built using **Node.js**, **Express**, and **PostgreSQL** running inside Docker.

---

## Features

- Full CRUD API
- PostgreSQL database
- Dockerized database
- Docker Compose support
- Automatic table creation
- Automatic seed data
- Environment variable configuration
- Swagger API documentation

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Docker
- Docker Compose
- pg
- Swagger UI

---

## Installation

Clone the repository

```bash
git clone <your-repo-url>
cd task-api
```

Install dependencies

```bash
npm install
```

Create

```text
.env
```

using

```text
.env.example
```

---

## Run locally

```bash
node app.js
```

---

## Run using Docker Compose

```bash
docker compose up --build
```

---

## Environment Variables

```env
DATABASE_URL=postgres://postgres:dev@localhost:5432/tasks
PORT=3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |
| GET | /health | Health Check |
| GET | /docs | Swagger Documentation |

---

## Example Request

### Create Task

POST `/tasks`

```json
{
  "title": "Learn Docker"
}
```

---

## Example Response

```json
{
  "id": 4,
  "title": "Learn Docker",
  "done": false
}
```

---

## Storage Layer

For Assignment 3, the storage backend was changed from **SQLite** to **PostgreSQL**.

The API routes and endpoints remained unchanged. Only the database implementation was updated, demonstrating separation between the API layer and the storage layer.

---

## Persistence Verification

Persistence was verified using Docker volumes.

Steps performed:

1. Started the application using:

```bash
docker compose up
```

2. Created new tasks using the POST endpoint.

3. Stopped the stack:

```bash
docker compose down
```

4. Started it again:

```bash
docker compose up
```

5. Retrieved tasks using GET `/tasks`.

The previously created tasks were still present, confirming that the PostgreSQL data volume persisted across container restarts.

---

## Assignment Requirements Completed

- PostgreSQL running in Docker
- Docker Volume for persistent storage
- Docker Compose
- `.env` configuration
- `.env.example`
- Automatic table creation
- Seed data
- PostgreSQL repository
- CRUD API
- Persistence verified
