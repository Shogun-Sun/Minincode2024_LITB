const express = require("express");
const path = require("path");
const router = express.Router();
const {checkRole} = require("../server/checkRole");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "home.html"));
});
router.get("/user/reg/page", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "reguser.html"));
});
router.get("/user/log/page", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "loginuser.html"));
});
router.get("/organization/reg/page", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "regorg.html"));
});
router.get("/organization/page", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "orgpages.html"));
});
router.get("/moderationorg", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "moderationorg.html"));
});
router.get("/user/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "profile.html"));
})

module.exports = router;
