import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHtml5, faCss3, faJs } from "@fortawesome/free-brands-svg-icons";


const ExperienceCard = ({ node }) => {
  const path = slug => {
    return "/Experience/languages-and-libraries" + slug;
  };

  return (
    <>
      <div className="card">
        
        <div className="card-body">
          <h3> {node.frontmatter.title}</h3>
          {/* <p>{node.frontmatter.summaryText}</p> */}
          <div className="card-footer">
            <div><a href={path(node.fields.slug)}>More info</a></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceCard;
