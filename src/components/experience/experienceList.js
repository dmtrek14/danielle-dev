import React from "react";
import ExperienceCard from "./experienceCard";

const ExperienceList = ({ data }) => {
  if (!data) return null;

  return (
    <>
      <div id="experience-list" className="three-col-grid">
        {data.allMdx.edges.map(({ node }) => (
          <ExperienceCard node={node} key={node.id} />
        ))}
      </div>
    </>
  );
};

export default ExperienceList;
