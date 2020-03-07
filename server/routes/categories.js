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
  const sql2 = `SELECT listings.title, listings.id, categories.\`name\` 
  FROM listings 
  LEFT JOIN categories ON listings.subcat_id = categories.id
  WHERE categories.slug = ?`
  conn.query(sql2, [slug], (err, results, fields) => {
    res.json(results)
  })
})

router.get("/listing/:id", (req, res, next) => {
  const id = `${req.params.id}`
  const sql3 = `SELECT id, title, \`desc\` FROM listings WHERE listings.id = ?`
  conn.query(sql3, [id], (err, results, fields) => {
    res.json(results)
  })
})

module.exports = router
