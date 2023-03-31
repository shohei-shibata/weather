import * as React from "react"
import { useState, useEffect } from "react"
import { escape, unescape } from "html-escaper"

const appKey = process.env.GATSBY_OPEN_WEATHER_APPKEY

const LocationSelector = ({setLocation}) => {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  
  const handleSubmit = e => {
    e.preventDefault()
    setQuery(e.target.query.value)
  }

  useEffect(() => {
    //console.log("fetch location", query)
    const sanitizedString = escape(query.replaceAll(" ",""))
    if (sanitizedString !== "") {
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${sanitizedString}&limit=5&appid=${appKey}`)
      .then(res => res.json())
      .then(data => {
        setSearchResults(data)
      })
    }
  },[ query ])

  const handleSetLocation = e => {
    const selectionIndex = parseInt(e.target.id.replace("search-result-", ""))
    setLocation({
      lon: searchResults[selectionIndex].lon,
      lat: searchResults[selectionIndex].lat
    })
  }

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
      <div className="search-results">
        <ul>
          { searchResults.map((result, index) => (
            <li key={`search-result-${index}`}>
              <button onClick={handleSetLocation} id={`search-result-${index}`}>
                {result.country} - {result.name}, {result.state}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LocationSelector
