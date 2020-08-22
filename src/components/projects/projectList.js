import React from "react";
import ProjectCard from "./projectCard";

const ProjectList = ({ data, isForHome }) => {
  if (!data) return null;

  return (
    <>
      {isForHome === true && (
        <>
          <hr />
          <h2>what I'm working on</h2>
        </>
      )}
      <div id="project-list" className="two-col-grid">
        {data.allMdx.edges.map(({ node }) => (
          <ProjectCard node={node} key={node.id} />
        ))}
      </div>
    </>
  );
};

export default ProjectList;
