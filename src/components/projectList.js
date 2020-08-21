import React from "react";
import Img from "gatsby-image"
//import { Link } from "gatsby";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ProjectList = ({ data, isForHome }) => {
    console.log(data)
  if (!data) return null;
 
  const path = (slug) =>{
    return "/Work/projects" + slug;
  }

  return (
    <>
      {isForHome === true && (
        <>
          <hr />
          <h2>what I'm working on</h2>
        </>
      )}
      <div className="project-list">
        {data.allMdx.edges.map(({ node }) => (
         
          <div key={node.id} className="card">
            <div className="card-img-top">
                {/* <img src={node.frontmatter.featuredImage}/> */}
                {/* <Img fluid={node.frontmatter.featuredImage.childImageSharp.fluid}/> */}
            </div>
            <div className="card-body">
                <h3>
                <a href={path(node.fields.slug)}>{node.frontmatter.title}</a>
                </h3>
                <p>{node.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectList;
