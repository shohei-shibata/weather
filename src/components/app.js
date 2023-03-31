import React from "react"
import { useState } from "react"
import LocationSelector from "./locationSelector"
import WeatherResult from "./weatherResult"

const App = () => {
  const [location, setLocation] = useState({
    lon: 100,
    lat: 50
  })


  return (
    <div className="app-container">
      <LocationSelector setLocation={setLocation}/>
      <WeatherResult location={location}/>
    </div>
  )
}

export default App