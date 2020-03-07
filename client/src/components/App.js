import React from "react"
import { Route } from "react-router-dom"
import Home from "./Home.js"
import SubCats from "./SubCats.js"
import Listing from "./Listing.js"

export default props => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/subs/:slug" component={SubCats} />
      <Route path="/listing/:id" component={Listing} />
    </div>
  )
}
