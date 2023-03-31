import * as React from "react"

const WeatherResult = (props) => {
  console.log("location", props.location)
  return (
    <div className="weather-result-container">
      Weather Result
    </div>
  )
}

export default WeatherResult
