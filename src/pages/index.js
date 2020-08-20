import React from "react"
import Layout from "../components/layout"
import SEO from "../components/layout/seo"
import SocialIcons from "../components/socialIcons"
import ProjectList from "../components/projectList"

export const query = graphql`
query projectsQuery{
  allMdx(filter: {fileAbsolutePath: {regex: "//projects//"}}) {
    totalCount,
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
        }
        excerpt(pruneLength: 200)
        id
      }
    }
  }
}
`

export default (props) => {
  console.log(props)
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
