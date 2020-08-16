import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/layout/seo"

export default (props) => {
  return (
    <Layout>
      <SEO title="Experience" description="Descriptions of the work I do, as well as the languages and tech I've worked with" pathname={props.location.pathname}/>
      <h1>Experience</h1>
      <p>What I can do.</p>
    </Layout>
  )
}