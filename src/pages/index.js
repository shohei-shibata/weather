import * as React from "react"
import App from "../components/app"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <h1>
        Simple Weather
      </h1>
      <App/>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
