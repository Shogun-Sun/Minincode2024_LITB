const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../pages", "home.html"));
});
router.get("/user/reg", (req, res) => {
        res.sendFile(path.join(__dirname, "../pages", "reguser.html"));
})

module.exports = router;