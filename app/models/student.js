'use strict'

const { Model } = require("objection");
const knex = require("../databases/knex");

Model.knex(knex)

class Student extends Model {
    static get tableName() {
        return "student";
    }

}

module.exports = Student
