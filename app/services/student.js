const Student = require('../models/student')

async function getAllStudent() {
    return Student.query({})
}

module.exports = {
    getAllStudent,
}