

const express = require("express");
const { signup, login, logout } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const { summarizeArticle } = require("../controllers/articleController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/check", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ isAuthenticated: false });


    res.json({ isAuthenticated: true });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });
    res.json({ message: "Logged out successfully" });
});


router.get("/user", authMiddleware, async (req, res) => {
    res.json({ id: req.user.id });
});

router.post("/:id/summary", authMiddleware, summarizeArticle);



module.exports = router;
