import React from "react"
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/layout/seo"
import SocialIcons from "../components/socialIcons"
import ProjectList from "../components/projects/projectList"

export const query = graphql`
query projectsQuery{
  allMdx(
    filter: {fileAbsolutePath: {regex: "//projects//"}, frontmatter: {isCurrent: {eq: true}}}, 
    limit: 4, 
    sort: {fields: frontmatter___projectStartDate, order: DESC}
    ) {
    totalCount,
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          isCurrent
          githubLink
          hasGithubLink
          summaryText
          projectStartDate(formatString: "YYYY MMMM D")
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800, maxHeight: 245, quality: 90)  {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        id
      }
    }
  }
}
`

export default (props) => {
  
  return (
    <Layout>
      <SEO title="Home" description="Welcome to my home page" pathname={props.location.pathname}/>
      <div>
        <h1>Danielle Mayabb</h1>
        <h2>full-stack developer | accessibility engineer | information architect</h2>
        <p>Hello! I'm Danielle. I make things for the web (and beyond). I'm passionate about building accessible and well-designed applications. My combined background in the arts, information science, and engineering has helped me form an empathetic and user-focused approach to development. I currently work for state government using a varied tech stack (mostly .NET, other bits-and-bobs), and I do hobby projects mostly in the JAMstack. </p>
        <hr/>
        <h2>find me online</h2>
        <SocialIcons/>  
        <ProjectList data={props.data} isForHome={true}/>
      </div>
    </Layout>
  )
}
