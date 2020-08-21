import React from "react"
import { graphql } from 'gatsby';
import Layout from "../../components/layout"
import SEO from "../../components/layout/seo"
import ProjectList from "../../components/projectList"

export const query = graphql`
query projectQuery{
  allMdx(filter: {fileAbsolutePath: {regex: "//projects//"}}) {
    totalCount,
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          isCurrent
        }
        excerpt(pruneLength: 200)
        id
      }
    }
  }
}
`

export default (props) => {
  return (
    <Layout>
      <SEO title="Work" description="Some of the work I've done" pathname={props.location.pathname}/>
      <h1>Work</h1>
      <p>Work I've done.</p>
      <h2>Projects</h2>
      <ProjectList data={props.data} isForHome={false}/>
    </Layout>
  )
}