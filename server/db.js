const mysql = require("mysql")
const config = require("config")

// for pushing to Heroku to use its config
const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.database,
})

// for accessing aws database in dev mode
// const pool = mysql.createPool({
// 	connectionLimit: 10,
// 	host: config.get("awsDB.host"),
// 	user: config.get("awsDB.user"),
// 	password: config.get("awsDB.password"),
// 	database: config.get("awsDB.database"),
// })

// for accessing local database
// const pool = mysql.createPool({
// 	connectionLimit: 10,
// 	host: config.get("db.host"),
// 	user: config.get("db.user"),
// 	password: config.get("db.password"),
// 	database: config.get("db.database"),
// })

module.exports = pool
