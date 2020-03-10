import React, { useEffect, useState } from "react"
import { useListings } from "../hooks"
import { Link } from "react-router-dom"
import "../styles/subCats.css"
import moment from "moment"
import validator from "validator"

export default props => {
  const { list, fetchListings, sendListing } = useListings()
  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState("")
  const [city, setCity] = useState("")
  const [cityError, setCityError] = useState("")
  const [location, setLocation] = useState("")
  const [desc, setDesc] = useState("")
  const [descError, setDescError] = useState("")
  const [price, setPrice] = useState("")
  const [priceError, setPriceError] = useState("")

  useEffect(() => {
    fetchListings(props.match.params.slug)
  }, [props.match.params])

  function handleSubmit(e) {
    e.preventDefault()
    let valid = true

    if (validator.isEmpty(title)) {
      valid = false
      setTitleError(` -- Can't be blank. Please enter a title.`)
    } else {
      setTitleError("")
    }

    if (validator.isEmpty(city)) {
      valid = false
      setCityError(` -- Can't be blank. Please enter a city.`)
    } else {
      setCityError("")
    }

    if (validator.isEmpty(desc)) {
      valid = false
      setDescError(` -- Enter a description.`)
    } else {
      setDescError("")
    }

    if (validator.isEmpty(price)) {
      valid = false
      setPriceError(` -- Enter a price or use 'free'.`)
    } else {
      setPriceError("")
    }

    if (valid) {
      sendListing(props.match.params.slug, title, city, location, desc, price)
      setTitle("")
      setCity("")
      setLocation("")
      setDesc("")
      setPrice("")
    }
  }

  return (
    <div className="allSubsPage">
      <Link to={"/"} className="homeButton">
        <button>Ryanslist</button>
      </Link>
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
                  <span className="timeStamp">
                    {moment(each.time_stamp).fromNow()}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="submitDiv">
          <h2>Submit your post below:</h2>
          <label className={titleError ? "error" : ""} htmlFor="title">
            Title {titleError && titleError}
          </label>
          <input
            id="title"
            type="text"
            placeholder="ex. Horse for sale"
            className={titleError ? "errorBox" : ""}
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <label className={cityError ? "error" : ""} htmlFor="city">
            City {cityError && cityError}
          </label>
          <input
            id="city"
            type="text"
            placeholder="ex. Las Vegas"
            className={cityError ? "errorBox" : ""}
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
          <label className={descError ? "error" : ""} htmlFor="desc">
            Description {descError && descError}
          </label>
          <textarea
            id="desc"
            placeholder="ex. Beautiful brown and white horse for sale"
            className={descError ? "errorBox" : ""}
            onChange={e => setDesc(e.target.value)}
            value={desc}
          ></textarea>
          <label className={priceError ? "error" : ""} htmlFor="price">
            Price {priceError && priceError}
          </label>
          <input
            id="price"
            type="text"
            placeholder="ex. Free"
            className={priceError ? "errorBox" : ""}
            onChange={e => setPrice(e.target.value)}
            value={price}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
