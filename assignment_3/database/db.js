const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function initializeDatabase() {
    try {
        console.log("Connecting to PostgreSQL...");

        // Create table if it doesn't exist
        await db.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                done BOOLEAN NOT NULL
            );
        `);

        console.log("Tasks table is ready.");

        // Check if table is empty
        const result = await db.query(
            "SELECT COUNT(*) AS total FROM tasks"
        );

        const total = parseInt(result.rows[0].total);

        if (total === 0) {
            await db.query(`
                INSERT INTO tasks (title, done)
                VALUES
                ('Learn Express', false),
                ('Build CRUD API', false),
                ('Connect PostgreSQL', false);
            `);

            console.log("Seed data inserted.");
        }

        console.log("Database initialized successfully.");

    } catch (err) {
        console.error("Database initialization failed:", err);
    }
}

initializeDatabase();

module.exports = db;
