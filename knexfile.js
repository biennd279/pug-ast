// Update with your config settings.
const path = require("path");
require("dotenv").config({ path: "./.env" })

module.exports = {

  development: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      charset: "utf8mb4",
    },
    migrations: {
      directory: path.join(__dirname, "./databases/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "./databases/seeds/development"),
    },
  },

  staging: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      charset: "utf8mb4",
    },
    migrations: {
      directory: path.join(__dirname, "./databases/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "./databases/seeds/development"),
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      charset: "utf8mb4",
    },
    migrations: {
      directory: path.join(__dirname, "./databases/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "./databases/seeds/development"),
    },
  }
};
