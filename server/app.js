const express = require("express")
const categoriesRoutes = require("./routes/categories")

const app = express()
const port = 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", categoriesRoutes)

app.get("*", function (req, res, next) {
	res.sendFile(__dirname + "/public/index.html")
})

app.listen(port, () => {
	console.log(`LISTENING ON PORT ${port}`)
})
