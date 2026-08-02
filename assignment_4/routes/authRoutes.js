const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");
const authMiddleware = require("../middleware/authMiddleware");

/*
=====================================
POST /auth/signup
=====================================
*/

router.post("/signup", async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }

        return res.status(201).json({
            message: "User created successfully",
            user: data.user
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
POST /auth/login
=====================================
*/

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });

        if (error) {
            return res.status(401).json({
                error: "Invalid login credentials"
            });
        }

        return res.status(200).json({

            message: "Login successful",

            access_token: data.session.access_token,

            refresh_token: data.session.refresh_token,

            user: data.user

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
POST /auth/logout
=====================================
*/

router.post("/logout", authMiddleware, async (req, res) => {

    try {

        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }

        return res.status(204).send();

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: "Internal Server Error"
        });

    }

});


module.exports = router;
