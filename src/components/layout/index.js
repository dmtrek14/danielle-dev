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
                <main id="main-content">
                    {children}
                </main>
            <Footer/>
        </>
    )
}

export default Layout;