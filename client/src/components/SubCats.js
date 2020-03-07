import React from "react"
import { useListings, useDescript } from "../hooks"
import { Link } from "react-router-dom"
// import "../styles/Home.css"

export default props => {
  const { list } = useListings()
  const { fetchDescript } = useDescript()

  return (
    <div className="subsWrapper">
      <div className="subsDiv">
        {list.map(each => (
          <div className="subCats" key={"each-" + each.title}>
            <Link
              key={"each" + each.id}
              to={"/listing/" + each.id}
              onClick={e => fetchDescript(each.id)}
            >
              <p>{each.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
