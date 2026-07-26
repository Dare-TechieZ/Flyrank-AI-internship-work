# Task API with SQLite

A RESTful Task Management API built using **Node.js**, **Express.js**, and **SQLite**. This project is an upgraded version of the CRUD API from Assignment 1, where in-memory storage has been replaced with a persistent SQLite database.

---

## Features

- Create a task
- Read all tasks
- Read a task by ID
- Update a task
- Delete a task
- Persistent storage using SQLite
- Automatic database and table creation
- Seed data on first run
- Swagger API Documentation

---

## Tech Stack

- Node.js
- Express.js
- SQLite3
- Swagger UI

---

## Why SQLite?

SQLite was chosen because:

- It is lightweight and serverless.
- It requires no additional installation or configuration.
- The database is stored in a single file (`tasks.db`).
- Data persists even after restarting the server.

---

## Project Structure

```
task-api/
│
├── database/
│   └── db.js
│
├── docs/
│   └── openapi.yaml
│
├── app.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

---

## Installation

Clone the repository

```bash
git clone <your-github-repo-url>
```

Move into the project

```bash
cd task-api
```

Install dependencies

```bash
npm install
```

---

## Run the Project

```bash
node app.js
```

The server starts on

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | API Information |
| GET | /health | Health Check |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

---

## Example Request

### Create Task

POST `/tasks`

```json
{
    "title": "Learn SQLite"
}
```

Response

```json
{
    "id": 4,
    "title": "Learn SQLite",
    "done": false
}
```

---

## SQLite Database

When the application starts:

- `tasks.db` is created automatically if it does not exist.
- The `tasks` table is created automatically.
- Three sample tasks are inserted only if the table is empty.

---

## Example SQL Queries

List all tasks

```sql
SELECT * FROM tasks;
```

Completed tasks

```sql
SELECT * FROM tasks WHERE done = 1;
```

Count tasks

```sql
SELECT COUNT(*) FROM tasks;
```

---

## Swagger Documentation

Open

```
http://localhost:3000/docs
```

to access the interactive API documentation.

---

## Testing

You can test the API using:

- Postman
- Thunder Client
- cURL
- Swagger UI

---

## Database Screenshot

Add a screenshot of the `tasks` table opened in **DB Browser for SQLite** here.

*(Insert screenshot in this section.)*

---

## Author

**Ria Saraswat**

Backend Development Internship – Week 3 Assignment 2
