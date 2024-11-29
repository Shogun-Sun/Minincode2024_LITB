const express = require("express");
const path = require("path");
const router = express.Router();
const {checkRoleAdmin} = require("../server/Roles/checkRoleAdmin");
const {checkRoleUser} = require("../server/Roles/checkRoleUser");
const {checkRoleOrganization} = require("../server/Roles/checkRoleOrganization");

router.get("/",  (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "home.html"));
});
router.get("/user/reg/page",  (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "reguser.html"));
});
router.get("/user/log/page",   (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "loginuser.html"));
});
router.get("/organization/reg/page", checkRoleAdmin,  (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "regorg.html"));
});
router.get("/organization/page", checkRoleUser, (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "orgpages.html"));
});
router.get("/moderationorg", checkRoleAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "moderationorg.html"));
});
router.get("/user/profile", checkRoleUser,  (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "profile.html"));
})
router.get("/organization/createsection", checkRoleOrganization, (req, res) => {
  res.sendFile(path.join(__dirname, "../pages", "createsection.html"));
})

module.exports = router;
