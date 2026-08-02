const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app = express();

app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const publicRoutes = require("./routes/publicRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

// Swagger
const swaggerDocument = require("./openapi.json");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/auth", authRoutes);
app.use("/public", publicRoutes);
app.use("/protected", protectedRoutes);

// Root Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server running and connected to Supabase."
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});