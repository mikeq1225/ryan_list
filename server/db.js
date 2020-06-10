const mysql = require("mysql")
const config = require("config")
const pool = mysql.createPool({
	connectionLimit: 10,
	host: config.get("awsDB.host"),
	user: config.get("awsDB.user"),
	password: config.get("awsDB.password"),
	database: config.get("awsDB.database"),
})

module.exports = pool
