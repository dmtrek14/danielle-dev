import React from "react";
import Layout from "../components/layout"
import SEO from "../components/layout/seo"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from "gatsby";



export default (props)=> {
    console.log(props)
    const { frontmatter, body, excerpt } = props.data.mdx;
    
    return (
        <Layout>
            <SEO title={frontmatter.title} description={excerpt} pathname={props.location.pathname}/>
            <h1>{frontmatter.title}</h1>
            <MDXRenderer>{body}</MDXRenderer>
        </Layout>
    )
}

export const query = graphql`
query ($id: String){
  mdx(id: { eq: $id }) {
    fields {
      slug
    }
    frontmatter { 
      title
    }
    id
    body
    excerpt(pruneLength: 100)
  }
}
`