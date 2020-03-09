import React from "react"
import { useAllCats } from "../hooks"
import { Link } from "react-router-dom"
import "../styles/Home.css"

export default props => {
  const { cats } = useAllCats()

  return (
    <div className="homeWrapper">
      <h1 className="ryanTitle">ryanslist</h1>
      <div>
        <p className="city">Las Vegas</p>
        <div className="catDiv">
          {cats.map(cat => (
            <div className="mainCats" key={"cat" + cat.id}>
              <h3>{cat.name}</h3>
              <div className="listingDiv">
                {cat.subCats.map(subcat => (
                  <Link key={"subcat" + subcat.id} to={"/subs/" + subcat.slug}>
                    <p className="listings">{subcat.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="nearby">nearby cl</p>
    </div>
  )
}
