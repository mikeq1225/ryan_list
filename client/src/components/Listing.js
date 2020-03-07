import React, { useEffect } from "react"
import { useDescript } from "../hooks"
// import { Link } from "react-router-dom"
// import "../styles/Home.css"

export default props => {
  const { item, fetchDescript } = useDescript()

  useEffect(() => {
    fetchDescript(props.match.params.id)
  }, [props.match.params])

  return (
    <div className="itemWrapper">
      <div className="itemDiv">
        {item.map(each => (
          <div className="item" key={"each-" + each.id}>
            <p>{each.title}</p>
            <p>{each.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
