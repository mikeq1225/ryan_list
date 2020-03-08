import React, { useEffect, useState } from "react"
import { useListings } from "../hooks"
import { Link } from "react-router-dom"
import "../styles/subCats.css"

export default props => {
  const { list, fetchListings, sendListing } = useListings()
  const [title, setTitle] = useState("")
  const [city, setCity] = useState("")
  const [location, setLocation] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const subCat = list.length > 0 && list[0].subcat_id

  const form = {
    title: title,
    subcat_id: subCat,
    city: city,
    location: location,
    desc: desc,
    price: price
  }

  useEffect(() => {
    fetchListings(props.match.params.slug)
  }, [props.match.params.slug])

  const handleSubmit = e => {
    console.log(form)
    // sendListing(form)
  }

  return (
    <div className="subsWrapper">
      <div>
        <h1>{list.length > 0 && list[0].name}</h1>
        <div className="subsDiv">
          {list &&
            list.map(each => (
              <div className="subCats" key={"each-" + each.title}>
                <Link key={"each" + each.id} to={"/listing/" + each.id}>
                  <p className="para">{each.title},</p>
                </Link>
                <span>({each.city})</span>
              </div>
            ))}
        </div>
      </div>
      <form className="submitDiv">
        <h2>Submit your post below:</h2>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="ex. Horse for sale"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          placeholder="ex. Las Vegas"
          onChange={e => setCity(e.target.value)}
          value={city}
        />
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="ex. Southwest"
          onChange={e => setLocation(e.target.value)}
          value={location}
        />
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          placeholder="ex. Beautiful brown and white horse for sale"
          onChange={e => setDesc(e.target.value)}
          value={desc}
        ></textarea>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          placeholder="ex. Free"
          onChange={e => setPrice(e.target.value)}
          value={price}
        />
        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}
