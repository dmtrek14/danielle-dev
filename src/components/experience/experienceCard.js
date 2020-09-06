import React from "react";

const ExperienceCard = ({ node }) => {
  const path = slug => {
    return "/Experience/languages-and-libraries" + slug;
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
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
