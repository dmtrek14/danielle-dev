import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/layout/seo"

export default (props) => {
  return (
    <Layout>
      <SEO title="About" description="A little more about me" pathname={props.location.pathname}/>
      <h1>About</h1>
      <p>Bio info</p>
    </Layout>
  )
}