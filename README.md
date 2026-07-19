# Task API

A simple RESTful CRUD API built with **Node.js** and **Express.js**. This API allows users to create, read, update, and delete tasks using HTTP requests. The project stores data in memory and provides interactive API documentation using Swagger UI.

## Swagger UI Screenshot

![Swagger UI](docs/task%20api.png)
---

## Features

- Create a new task
- View all tasks
- View a task by ID
- Update an existing task
- Delete a task
- Input validation
- Proper HTTP status codes
- Interactive Swagger UI documentation

---

## Tech Stack

- Node.js
- Express.js
- Swagger UI Express
- YAMLJS

---

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/task-api.git
```

### Navigate to the project

```bash
cd task-api
```

### Install dependencies

```bash
npm install
```

### Start the server

```bash
npm run dev
```

or

```bash
npm start
```

The server will start at:

```
http://localhost:3000
```

Swagger Documentation:

```
http://localhost:3000/docs
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | API information |
| GET | /health | Health check |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create a task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

---

## Sample Request

### Create Task

**POST** `/tasks`

Request Body

```json
{
  "title": "Buy milk"
}
```

Response

```json
{
  "id": 4,
  "title": "Buy milk",
  "done": false
}
```

Status Code

```
201 Created
```

---

## Example curl Command

```bash
curl -i -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Buy milk\"}"
```

Example Response

```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 4,
  "title": "Buy milk",
  "done": false
}
```

---

## HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Request successful |
| 201 | Resource created |
| 204 | Resource deleted successfully |
| 400 | Invalid request |
| 404 | Task not found |

---

## Project Structure

```
task-api/
│
├── docs/
│   └── openapi.yaml
├── app.js
├── package.json
├── package-lock.json
├── README.md
└── node_modules/
```

---

## Testing

The API can be tested using:

- Browser (GET requests)
- Hoppscotch
- Swagger UI
- curl

---

## Swagger UI

Open the following URL after starting the server:

```
http://localhost:3000/docs
```

Use the **Try it out** feature to test all CRUD operations directly from the browser.

---

## Note

This project uses **in-memory storage**, so all tasks are reset whenever the server restarts. No database is used.

---

## Author

**Ria Saraswat**

GitHub: https://github.com/Dare-TechieZ
