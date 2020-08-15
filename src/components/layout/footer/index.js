import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => (
<footer>
<div>
© {new Date().getFullYear()}  <a href="https://github.com/dmtrek14">@dmtrek14</a>          
</div>
<div>
Built with
          {` `}
          <FontAwesomeIcon icon={faCode}/> + <FontAwesomeIcon icon={faCoffee}/> + <FontAwesomeIcon icon={faHeart}/>
           &nbsp;
           in Reno, NV
</div>
 </footer>
 
)


export default Footer