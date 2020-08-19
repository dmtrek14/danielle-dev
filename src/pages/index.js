import React from "react"
import Layout from "../components/layout"
import SEO from "../components/layout/seo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faCodepen, faDev } from '@fortawesome/free-brands-svg-icons'

export default (props) => {
  return (
    <Layout>
      <SEO title="Home" description="Welcome to my home page" pathname={props.location.pathname}/>
      {/* <div></div> */}
      <div>
        <h1>Danielle Mayabb</h1>
        <h2>full-stack developer | accessibility engineer | information architect</h2>
        <ul className="social">
          <li><a href="https://github.com/dmtrek14"><FontAwesomeIcon icon={faGithub}/><span className="sr-only">Github profile</span></a></li>
          <li><a href="https://www.linkedin.com/in/danielle-mayabb-4066a4105/"><FontAwesomeIcon icon={faLinkedin}/><span className="sr-only">LinkedIn profile</span></a></li>
          <li><a href="https://codepen.io/dmtrek14"><FontAwesomeIcon icon={faCodepen}/><span className="sr-only">Codepen profile</span></a></li>
          <li><a href="https://dev.to/thescifibrarian"><FontAwesomeIcon icon={faDev}/><span className="sr-only">Dev profile</span></a></li>
        </ul>
        <p>Hello! I'm Danielle. I make things for the web (and beyond). I'm passionate about building accessible and well-designed applications. My combined background in the arts, information science, and engineering has helped me form an empathetic and user-focused approach to development. I currently work for state government using a varied tech stack (mostly .NET, other bits-and-bobs), and I do hobby projects mostly in the JAMstack. </p>
        
        <hr/>
        <h2>What I'm working on</h2>
      </div>
      {/* <div></div> */}
    </Layout>
  )
}
