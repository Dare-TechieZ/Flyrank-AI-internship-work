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
//now i am not getting task from memory,i am getting from db(postgres)
app.get("/tasks", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM tasks ORDER BY id"
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.get("/tasks/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    try {

        const result = await db.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        res.json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

app.post("/tasks", async (req, res) => {

    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    try {

        const result = await db.query(
            `INSERT INTO tasks (title, done)
             VALUES ($1, $2)
             RETURNING *`,
            [title.trim(), false]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
app.put("/tasks/:id", async (req, res) => {

    const id = parseInt(req.params.id);
    const { title, done } = req.body;

    if (
        !title ||
        title.trim() === "" ||
        typeof done !== "boolean"
    ) {
        return res.status(400).json({
            error: "Invalid input"
        });
    }

    try {

        const result = await db.query(
            `UPDATE tasks
             SET title = $1,
                 done = $2
             WHERE id = $3
             RETURNING *`,
            [title.trim(), done, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        res.json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
app.delete("/tasks/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    try {

        const result = await db.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        res.status(204).send();

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});