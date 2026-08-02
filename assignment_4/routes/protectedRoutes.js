const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

/*
=====================================
GET /protected/profile
=====================================
*/

router.get("/profile", authMiddleware, async (req, res) => {

    try {

        return res.status(200).json({

            id: req.user.id,

            email: req.user.email,

            created_at: req.user.created_at

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: "Internal Server Error"
        });

    }

});


/*
=====================================
GET /protected/dashboard
=====================================
*/

router.get("/dashboard", authMiddleware, async (req, res) => {

    try {

        return res.status(200).json({

            message: `Welcome ${req.user.email}`,

            dashboard: {
                projects: 5,
                tasks: 14,
                notifications: 3
            }

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: "Internal Server Error"
        });

    }

});

module.exports = router;