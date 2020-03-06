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
