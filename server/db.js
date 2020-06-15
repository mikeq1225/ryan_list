const mysql = require("mysql")
const config = require("config")

// for pushing to Heroku to use its config
const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.host || config.get("awsDB.host"),
	user: process.env.user || config.get("awsDB.user"),
	password: process.env.password || config.get("awsDB.password"),
	database: process.env.database || config.get("awsDB.database"),
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
