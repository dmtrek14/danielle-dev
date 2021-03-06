import React from "react";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ node }) => {
  const path = slug => {
    return "/Work/projects" + slug;
  };

  const altText = "Screenshot of " + node.frontmatter.title + " project";

  const GithubLink = ({ github }) => {
    if (node.frontmatter.hasGithubLink) {
      return (
        <>
          <a href={node.frontmatter.githubLink}>
            <FontAwesomeIcon icon={faGithub} /> View code &nbsp; <span className="sr-only"> for {node.frontmatter.title}</span>
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </a>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-img-top">
          <Img
            fluid={node.frontmatter.featuredImage.childImageSharp.fluid}
            alt={altText}
          />
        </div>
        <div className="card-body">
          <h3>{node.frontmatter.title}</h3>
          <p>{node.frontmatter.summaryText}</p>
          <div className="card-footer">
            <div>
              <a href={path(node.fields.slug)}>More info <span className="sr-only"> about my work on {node.frontmatter.title}</span></a>
            </div>
            <div>
              <GithubLink github={node.frontmatter.githubLink} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
