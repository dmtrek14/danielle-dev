import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Header from "./header";
import Footer from "./footer";
import "./styles.css";

const Layout = ({ children }) => {
  const pageQuery = useStaticQuery(graphql`
    {
      headerImage: file(relativePath: { eq: "profile-photo.jpg" }) {
        childImageSharp {
          fixed(width: 60) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <>
      <Header profileImage={pageQuery.headerImage.childImageSharp.fixed} />
      <div className="container">
        <main id="main-content" tabIndex="-1">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
