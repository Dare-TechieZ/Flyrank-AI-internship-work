const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("tasks.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
        return;
    }

    console.log("Connected to SQLite database.");

    db.run(
        `
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            done INTEGER NOT NULL
        )
        `,
        (err) => {
            if (err) {
                console.error("Error creating table:", err.message);
                return;
            }

            console.log("Tasks table is ready.");

            // Check if table is empty
            db.get(
                "SELECT COUNT(*) AS total FROM tasks",
                (err, row) => {

                    if (err) {
                        console.error(err.message);
                        return;
                    }

                    if (row.total === 0) {

                        const stmt = db.prepare(
                            "INSERT INTO tasks(title, done) VALUES (?, ?)"
                        );

                        stmt.run("Learn Express", 0);
                        stmt.run("Build CRUD API", 0);
                        stmt.run("Connect SQLite", 0);

                        stmt.finalize();

                        console.log("Seed data inserted.");
                    }
                }
            );
        }
    );
});

module.exports = db;
