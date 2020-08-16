import React from "react"
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => (
<footer>
    <div>
        © {new Date().getFullYear()}  <a href="https://github.com/dmtrek14">@dmtrek14</a>          
    </div>
    <div>
        Built with &nbsp;
        <Link to="/Uses">
            <FontAwesomeIcon icon={faCode}/> + <FontAwesomeIcon icon={faCoffee}/> + <FontAwesomeIcon icon={faHeart}/>
        </Link> 
        &nbsp; in Reno, NV
    </div>
 </footer>
 
)


export default Footer