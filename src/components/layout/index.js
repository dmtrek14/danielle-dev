import React from 'react'
//import { graphql, useStaticQuery } from 'gatsby'
import Header from './header'
import Footer from "./footer"
import './styles.css'

const Layout = ({ children}) => {
    
    return (
        <>
            <Header/>
            <div className="container">
                <main id="main-content" tabIndex="-1">
                    {children}
                </main>
            </div>    
            <Footer/>
        </>
    )
}

export default Layout;