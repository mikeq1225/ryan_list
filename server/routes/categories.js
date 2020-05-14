const express = require("express")
const router = express.Router()
const conn = require("../db")

//query for getting all categories from database
router.get("/categories", (req, res, next) => {
	const sql = "SELECT * FROM categories"
	let allData = {}
	conn.query(sql, (err, results, fields) => {
		allData.cats = results.filter((category) => category.parent_id == null)

		allData.cats.map((cat) => {
			let subCats = results.filter((category) => category.parent_id === cat.id)
			cat.subCats = subCats
		})

		res.json(allData)
	})
})

//query for getting all postings for the sub-categories from database
router.get("/subs/:slug", (req, res, next) => {
	const slug = `${req.params.slug}`
	const sql2 = `SELECT listings.title, listings.id, categories.\`name\`, listings.subcat_id, listings.city, listings.location, listings.time_stamp 
  FROM listings 
  LEFT JOIN categories ON listings.subcat_id = categories.id
  WHERE categories.slug = ?
  ORDER BY listings.time_stamp DESC
  LIMIT 25`

	conn.query(sql2, [slug], (err, results, fields) => {
		res.json(results)
	})
})

// query for posting  a listing to the database
router.post("/subs/:slug", (req, res, next) => {
	const slug = req.params.slug
	const title = req.body.title
	const city = req.body.city
	const location = req.body.location
	const price = req.body.price
	const desc = req.body.desc

	const sql5 = "SELECT id FROM categories WHERE slug = ?"
	conn.query(sql5, [slug], (err, results, fields) => {
		const sub_id = results[0].id

		const sql4 = `INSERT INTO listings(title,subcat_id,\`desc\`, city, location, price)
    VALUES(?,?,?,?,?,?)`
		conn.query(
			sql4,
			[title, sub_id, desc, city, location, price],
			(err2, results2, fields2) => {
				res.json(results2)
			}
		)
	})
})

//query for getting individual listing info.
router.get("/listing/:id", (req, res, next) => {
	const id = `${req.params.id}`
	const sql3 = `SELECT * FROM listings WHERE listings.id = ?`
	conn.query(sql3, [id], (err, results, fields) => {
		res.json(results)
	})
})

module.exports = router
