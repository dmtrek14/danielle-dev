import React from "react"
import Layout from "../components/layout"
import SEO from "../components/layout/seo"
import SocialIcons from "../components/socialIcons"

export default (props) => {
  return (
    <Layout>
      <SEO title="Home" description="Welcome to my home page" pathname={props.location.pathname}/>
      <div>
        <h1>Danielle Mayabb</h1>
        <h2>full-stack developer | accessibility engineer | information architect</h2>
        {/* <SocialIcons/> */}
        <p>Hello! I'm Danielle. I make things for the web (and beyond). I'm passionate about building accessible and well-designed applications. My combined background in the arts, information science, and engineering has helped me form an empathetic and user-focused approach to development. I currently work for state government using a varied tech stack (mostly .NET, other bits-and-bobs), and I do hobby projects mostly in the JAMstack. </p>

        <hr/>
        <h2>find me online</h2>
        <SocialIcons/>  

        <hr/>
        <h2>what I'm working on</h2>

        
        
      </div>
    </Layout>
  )
}
