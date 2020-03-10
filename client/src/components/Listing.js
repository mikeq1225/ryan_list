import React, { useEffect } from "react"
import { useDescript } from "../hooks"
import { Link } from "react-router-dom"
import "../styles/Listing.css"
import moment from "moment"

export default props => {
  const { item, fetchDescript } = useDescript()

  useEffect(() => {
    fetchDescript(props.match.params.id)
  }, [props.match.params])

  return (
    <div className="listingPage">
      <Link to={"/"} className="homeButton">
        <button>Ryanslist</button>
      </Link>
      <div className="itemWrapper">
        <div className="itemDiv">
          {item.map(each => (
            <div className="item" key={"each-" + each.id}>
              <div className="postDiv">
                <p className="timeStamp">
                  Posted: {moment(each.time_stamp).fromNow()}
                </p>
              </div>
              <p className="itemTitle">
                {each.title} - {each.price}
              </p>
              <p>Location:</p>
              <p>
                {each.city} ({each.location})
              </p>
              <p>Description:</p>
              <p>{each.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
