import React from 'react'
//import { graphql, useStaticQuery } from 'gatsby'
import Header from './header'
import Footer from "./footer"
import './layout.css'

const Layout = ({ children}) => {
//     const data = useStaticQuery(graphql`
//     query SiteTitleQuery {
//       site {
//         siteMetadata {
//           title
//         }
//       }
//     }
//   `)
    
    return (
        <>
            <Header/>
            <div className="container">
                <main id="main-content">
                    {children}
                </main>
            </div>    
            <Footer/>
        </>
    )
}

export default Layout;