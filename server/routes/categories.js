const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/categories", (req, res, next) => {
  const sql = "SELECT * FROM categories"
  conn.query(sql, (err, results, fields) => {
    const category = []
    results.filter(function(cat) {
      if (results.parent_id == null) {
        category.push(cat)
      }
    })
    res.json(category)
  })
})

// router.get("/categories", (req, res, next) => {
//   res.json(going)
// })

// router.get("/categories", (req, res, next) => {
//   const sql = `SELECT name
//   FROM ryans_list.categories
//   WHERE ISNULL(parent_id)`
//   conn.query(sql, (err, results, fields) => {
//     res.json(results)
//   })
// })

module.exports = router
