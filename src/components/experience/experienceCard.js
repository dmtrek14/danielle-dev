import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3, faJs } from "@fortawesome/free-brands-svg-icons";

const ExperienceCard = ({ node }) => {
  const path = slug => {
    return "/Experience/languages-and-libraries" + slug;
  };

  const Icon = (icon) => {
    console.log(icon);
    if(icon === "faHtml5"){
      return  <FontAwesomeIcon icon={faHtml5} />
    }
    else if(icon === "faCss3"){
      return  <FontAwesomeIcon icon={faCss3} />
    }
    else if (icon === "faJs"){
      return  <FontAwesomeIcon icon={faJs} />
    }
    else return "test";
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Icon icon={node.frontmatter.icon}/>
          <h3>{node.frontmatter.title}</h3>
          {/* <p>{node.frontmatter.summaryText}</p> */}
          <div className="card-footer">
            <div></div>
            <div>
              <a href={path(node.fields.slug)}>More info <span className="sr-only"> about my experience  {node.frontmatter.title}</span></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceCard;
