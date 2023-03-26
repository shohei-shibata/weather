import * as React from "react"
import { useState, useEffect } from "react"
import { escape, unescape } from "html-escaper"

const LocationSelector = ({setLocation}) => {
  const [query, setQuery] = useState("")
  
  const handleSubmit = e => {
    e.preventDefault()
    console.log("form submitted", e.target.query.value)
    setQuery(e.target.query.value)
  }

  useEffect(() => {
    //console.log("fetch location", query)
    const sanitizedString = escape(query.replaceAll(" ",""))
    console.log("string sanitized", sanitizedString)
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${sanitizedString}&limit=5&appid=60f3ac8fb5707821382a20440c2e42d1`)
    .then(res => (
      console.log("res", res.body)
    ))
    },[ query ])

  console.log("query", query)

  return (
    <div className="location-chooser-container">
      Location Selector
      <form onSubmit={handleSubmit}>
        <label>
          <p>Query</p>
          <input name="query"/>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LocationSelector
