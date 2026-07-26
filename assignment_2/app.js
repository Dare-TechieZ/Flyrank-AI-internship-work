const express = require("express");

const app = express();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./docs/openapi.yaml");
const db = require("./database/db");

app.use(express.json());

const PORT = 3000;

// Root endpoint
app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

// Health endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});
//now i am not getting task from memory,i am getting from db(sqlite3)
app.get("/tasks", (req, res) => {
    db.all(
        "SELECT * FROM tasks",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            const tasks = rows.map(task => ({
                id: task.id,
                title: task.title,
                done: Boolean(task.done)
            }));

            res.json(tasks);
        }
    );
});
app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    error: `Task ${id} not found`
                });
            }

            res.json({
                id: row.id,
                title: row.title,
                done: Boolean(row.done)
            });
        }
    );
});

app.post("/tasks", (req, res) => {
    const { title } = req.body;

    // Validation (same as Assignment 1)
    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    db.run(
        "INSERT INTO tasks (title, done) VALUES (?, ?)",
        [title.trim(), 0],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                title: title.trim(),
                done: false
            });
        }
    );
});
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, done } = req.body;

    // Validate input
    if (
        !title ||
        title.trim() === "" ||
        typeof done !== "boolean"
    ) {
        return res.status(400).json({
            error: "Invalid input"
        });
    }

    db.run(
        "UPDATE tasks SET title = ?, done = ? WHERE id = ?",
        [title.trim(), done ? 1 : 0, id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            // No rows updated means ID doesn't exist
            if (this.changes === 0) {
                return res.status(404).json({
                    error: `Task ${id} not found`
                });
            }

            res.json({
                id,
                title: title.trim(),
                done
            });
        }
    );
});
app.delete("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    db.run(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: `Task ${id} not found`
                });
            }
            res.status(204).send();
        }
    );
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});