import React from "react"
import Layout from "../components/layout"
import SEO from "../components/layout/seo"

export default (props) => {
  return (
    <Layout>
      <SEO title="Home" description="Welcome to my home page" pathname={props.location.pathname}/>
      <h1>Hello! I'm Danielle. I make things for the web.</h1>
      <p>This is the home page</p>
    </Layout>
  )
}
