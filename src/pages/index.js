import React from "react"
import Layout from "../components/layout"
import SEO from "../components/layout/seo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default (props) => {
  return (
    <Layout>
      <SEO title="Home" description="Welcome to my home page" pathname={props.location.pathname}/>
      <h1>Danielle Mayabb</h1>
      <h2>full-stack developer | accessibility engineer | information architect</h2>
      <ul className="social">
        <li> <FontAwesomeIcon icon={faGithub}/></li>
        <li> <FontAwesomeIcon icon={faLinkedin}/></li>
      </ul>
      <p>Hello! I'm Danielle. I make things for the web.</p>

      <hr/>
      <div>
        <h2>What I'm working on</h2>
      </div>
    </Layout>
  )
}
