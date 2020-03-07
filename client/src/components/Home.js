import React from "react"
import { useAllCats } from "../hooks"
import { Link } from "react-router-dom"
import "../styles/Home.css"

export default props => {
  const { cats } = useAllCats()

  return (
    <div className="homeWrapper">
      <h1>Ryan's List</h1>
      <div className="catDiv">
        {cats.map(cat => (
          <div className="mainCats" key={"cat" + cat.id}>
            <h1>{cat.name}</h1>
            {cat.subCats.map(subcat => (
              <Link key={"subcat" + subcat.id} to={"/subs/" + subcat.slug}>
                <p>{subcat.name}</p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
