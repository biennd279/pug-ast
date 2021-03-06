const express = require('express');
const router = express.Router();
const studentRouter = require('./students')
const { unflatten } = require('flat')

router.use("/students", studentRouter);

router.get('/', (req, res, next) => {
    res.status(405).json({
        message: 'Use post method'
    })
})

router.post('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Ok'
    })
})

module.exports = router;