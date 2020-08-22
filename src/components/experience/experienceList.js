import React from "react";
import ExperienceCard from "./experienceCard"


const ExperienceList = ({ data }) => {
  if (!data) return null;
 
  return (
    <>
      <div className="experience-list">
        {data.allMdx.edges.map(({ node }) => (
          <ExperienceCard node={node} key={node.id}/>          
        ))}
      </div>
    </>
  );
};

export default ExperienceList;
