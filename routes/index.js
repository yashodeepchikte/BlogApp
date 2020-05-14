const express = require("express");
const router = express.Router();
const {ensureAuthenticated} =require("../config/auth")
const User = require("../models/Users")


router.get("/", (req, res) => {
    res.render("welcome");
})

//Welcome page
router.get("", (req, res) => {
    res.render("welcome");
})

module.exports = router;