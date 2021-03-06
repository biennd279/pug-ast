'use strict';

const express = require('express');
const router = express.Router();
const Student = require("../../app/models/student")

router.get("/", async (req, res, next) => {
    Student.query()
        .then(students => {
            res.render("students", {students : students})
        })
        .catch(error => {
            next(error)
        })
})

// This feature still developing...
/*router.post("/", (req, res, next) => {

}) */

router.get("/:id", (req, res, next) => {
    Student.query().findOne({id : req.params.id})
        .then(student => {
            console.log(student)
            res.render("student", {student : student})
        })
        .catch(error => {
            next(error)
        })
})

// This feature still developing...
/* router.post("/:id/update", ((req, res, next) => {

})) */

module.exports = router;
