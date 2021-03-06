'use strict';
const Student = require('../app/models/student')
const studentServices = require('../app/services/student')

let students = await studentServices.getAllStudent()
console.log(students);