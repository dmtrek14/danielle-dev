import React from "react";
import "../../components/layout/experience.css"

const ExperienceCard = ({ node }) => {
  const path = slug => {
    return "/Experience/languages-and-libraries" + slug;
  };

  return (
    <>
      <div className="card experience-card">
        <div className="card-body">
          <h3>{node.frontmatter.title}</h3>
          <p>{node.frontmatter.yearsOfExp} years experience</p>
          <a href={path(node.fields.slug)}>More info <span className="sr-only"> about my experience with {node.frontmatter.title}</span></a>
        </div>
      </div>
    </>
  );
};

export default ExperienceCard;
