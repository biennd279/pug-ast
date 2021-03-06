'use strict';

const express = require('express');
const router = express.Router();
const studentService = require("../../app/services/student")
const Student = require("../../app/models/student")

router.get("/", (req, res, next) => {
    res.render("students", {students : []})
})

// Close api for maintain
/*router.post("/", (req, res, next) => {

}) */

router.get("/:id", (req, res, next) => {
    res.render("student", {})
})

// Close for maintain
/* router.post("/:id/update", ((req, res, next) => {

})) */

module.exports = router;
