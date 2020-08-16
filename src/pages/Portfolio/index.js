import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/layout/seo"

export default (props) => {
  return (
    <Layout>
      <SEO title="Portfolio" description="Some of the work I've done" pathname={props.location.pathname}/>
      <h1>Portfolio</h1>
      <p>Work I've done.</p>
    </Layout>
  )
}