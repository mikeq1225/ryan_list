const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/categories", (req, res, next) => {
  const sql = "SELECT * FROM categories"
  let allData = {}
  conn.query(sql, (err, results, fields) => {
    allData.cats = results.filter(category => category.parent_id == null)

    allData.cats.map(cat => {
      let subCats = results.filter(category => category.parent_id === cat.id)
      cat.subCats = subCats
    })

    res.json(allData)
  })
})

router.get("/subs/:slug", (req, res, next) => {
  const slug = `${req.params.slug}`
  const sql2 = `SELECT listings.title, listings.id, categories.\`name\`, listings.subcat_id 
  FROM listings 
  LEFT JOIN categories ON listings.subcat_id = categories.id
  WHERE categories.slug = ?`
  conn.query(sql2, [slug], (err, results, fields) => {
    res.json(results)
  })
})

router.post("/subs/:slug", (req, res, next) => {
  const id = `${req.params.subcat_id}`
  const title = `${req.body.title}`
  const city = `${req.body.city}`
  const location = `${req.body.location}`
  const price = `${req.body.price}`
  sql4 = `INSERT INTO listings(title,subcat_id,\`desc\`, city, location, price)
  VALUES(?,${id},?,?,?)`
  conn.query(
    sql4,
    [title],
    [city],
    [location],
    [price],
    (err, results, fields) => {
      res.json(results)
    }
  )
})

router.get("/listing/:id", (req, res, next) => {
  const id = `${req.params.id}`
  const sql3 = `SELECT * FROM listings WHERE listings.id = ?`
  conn.query(sql3, [id], (err, results, fields) => {
    res.json(results)
  })
})

module.exports = router
