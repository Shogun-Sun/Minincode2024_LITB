const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../pages", "home.html"));
});
router.get("/user/reg/page", (req, res) => {
        res.sendFile(path.join(__dirname, "../pages", "reguser.html"));
})
router.get("/organization/reg/page", (req, res) => {
        res.sendFile(path.join(__dirname, "../pages", "regorg.html"));
})

router.get("/moderationorg", (req, res) => {
        res.sendFile(path.join(__dirname, "../pages", "moderationorg.html"));
})

router.get("/user/login/page", (req, res) => {
        res.sendFile(path.join(__dirname, "../pages", "loginuser.html"));
})

module.exports = router;