import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import SEO from "../../components/layout/seo";
import ProjectList from "../../components/projects/projectList";

export const query = graphql`
  query projectQuery {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//projects//" } }
      sort: { fields: frontmatter___projectStartDate, order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            isCurrent
            githubLink
            hasGithubLink
            summaryText
            projectStartDate(formatString: "YYYY MMMM D")
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 768, maxHeight: 200, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          id
        }
      }
    }
  }
`;

export default props => {
  return (
    <Layout>
      <SEO
        title="Work"
        description="Some of the work I've done as a developer"
        pathname={props.location.pathname}
      />
      <h1>Work</h1>
      <p>
        I've worked on several projects on which I'm the sole developer, but
        I've also contributed to many team projects. I've listed here a
        combination of hobby projects and those I've done in the course of my
        work. Much of the work I've done for my employer is proprietary, but
        I've tried to provide code snippets, screenshots, and summaries where
        appropriate in the detail view for each project.
      </p>
      <hr/>
      <h2>Selected projects and code</h2>
      <ProjectList data={props.data} isForHome={false} />
    </Layout>
  );
};
