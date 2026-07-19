const express = require("express");

const app = express();

app.use(express.json());
let tasks = [
    {
        id: 1,
        title: "Complete assignment",
        done: false
    },
    {
        id: 2,
        title: "Study Express",
        done: true
    },
    {
        id: 3,
        title: "Go for a walk",
        done: false
    }
];
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
app.get("/tasks", (req, res) => {
    res.json(tasks);
});
app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);
});

app.post("/tasks", (req, res) => {
    const { title } = req.body;

    // Validate input
    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    // Generate next ID
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: title.trim(),
        done: false
    };

    // Add to the in-memory array
    tasks.push(newTask);

    // Return the created task
    res.status(201).json(newTask);
});
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, done } = req.body;

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    if (
        (title !== undefined && title.trim() === "") ||
        (done !== undefined && typeof done !== "boolean")
    ) {
        return res.status(400).json({
            error: "Invalid input"
        });
    }

    if (title !== undefined) {
        task.title = title.trim();
    }

    if (done !== undefined) {
        task.done = done;
    }

    res.json(task);
});
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    tasks.splice(index, 1);

    res.status(204).send();
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});