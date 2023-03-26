import * as React from "react"

const WeatherResult = (props) => {
  console.log(props.location)
  return (
    <div className="weather-result-container">
      Weather Result
    </div>
  )
}

export default WeatherResult
