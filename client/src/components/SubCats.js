import React, { useEffect, useState } from "react"
import { useListings } from "../hooks"
import { Link } from "react-router-dom"
import "../styles/subCats.css"

export default props => {
  const { list, fetchListings, sendListing } = useListings()
  const { form, setForm } = useState({
    title: "",
    subcat_id: list.subcat_id,
    city: "",
    location: "",
    desc: "",
    price: ""
  })

  useEffect(() => {
    fetchListings(props.match.params.slug)
  }, [props.match.params])

  const handleChange = (e, field) => {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }
  const handleSubmit = () => {
    // console.log("form", form)
    sendListing(form)
  }

  return (
    <div className="subsWrapper">
      <div className="subsDiv">
        {list.map(each => (
          <div className="subCats" key={"each-" + each.title}>
            <Link key={"each" + each.id} to={"/listing/" + each.id}>
              <p>{each.title}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="submitDiv">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="ex. Horse for sale"
          onInput={e => handleChange(e, "title")}
        />
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          placeholder="ex. Las Vegas"
          onInput={e => handleChange(e, "city")}
        />
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="ex. Southwest"
          onInput={e => handleChange(e, "location")}
        />
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          placeholder="ex. Beautiful brown and white horse for sale"
          onChange={e => handleChange(e, "desc")}
        ></textarea>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          placeholder="ex. Free"
          onInput={e => handleChange(e, "price")}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
