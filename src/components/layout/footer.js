import React from "react"
import { Link } from 'gatsby'
import SocialIcons from "../socialIcons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => (
<footer>
    <div><SocialIcons/> </div>
    <div className="mt-2">
        Built with &nbsp;
        <Link to="/Uses">
            <FontAwesomeIcon icon={faCode}/><span className="sr-only">code</span> + 
            <FontAwesomeIcon icon={faCoffee}/><span className="sr-only">coffee</span> +  
            <FontAwesomeIcon icon={faHeart}/><span className="sr-only">love</span> 
        </Link> 
        &nbsp; in Reno, NV
    </div>
    <div className="mt-2">
        © {new Date().getFullYear()} Danielle Mayabb        
    </div>
 </footer>
 
)


export default Footer