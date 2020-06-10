const express = require("express")
const path = require("path")
const categoriesRoutes = require("./routes/categories")
const app = express()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", categoriesRoutes)

app.get("*", function (req, res, next) {
	res.sendFile(__dirname + "/public/index.html")
})

const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`LISTENING ON PORT ${port}`)
})

// const port = 3001
// app.listen(port, () => {
// 	console.log(`LISTENING ON PORT ${port}`)
// })
