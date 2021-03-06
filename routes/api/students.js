'use strict';

const express = require('express');
const router = express.Router();
const Student = require("../../app/models/student")
const { unflatten } = require('flat')

router.get('/', (req, res, next) => {
    Student.query()
        .then(students => {
            return res.json(students)
        })
        .catch(() => {
            return res.status(500)
        })
})

router.route("/:id")
    .all((req, res, next) => {
        Student.query().findOne({id: req.params.id})
            .then(student => {
                req.student = student
                return next()
            })
            .catch(() => {
                return res.status(404).send()
            })
    })
    .get((req, res) => {
        let student = req.student
        return res.json(student)
    })
    .post((req, res) => {
        return res.status(405).send()
    })
    .put((req, res) => {
        let student = req.student
        if (student.id === 1 || student.name === "admin") {
            return res.status(403).send()
        }

        let obj = unflatten(req.body);

        // Dont try change id, name of them
        // Try change everything in this app :v
        const protectedProperties = ["id", "name"]

        Object.keys(obj).forEach(key => {
            if (key in protectedProperties) {
                delete obj[key];
            }
        })

        student.$query().patchAndFetch(obj)
            .then(student => {
                return res.status(201).json(student)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    })

module.exports = router;