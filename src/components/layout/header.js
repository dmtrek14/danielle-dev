import React from "react"
import { Link } from 'gatsby'

const Header = () => (
<header>
    <nav>
        <div className="site-name">Danielle M.</div>
        <div className="site-links">
            <Link to="/Portfolio">Portfolio</Link>
            <Link to="/Experience">Experience</Link>
            <Link to="/About">About</Link>
        </div>
    </nav>
</header>
)

  export default Header