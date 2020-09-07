import React from "react";
import { graphql } from 'gatsby';
import Layout from "../../components/layout";
import SEO from "../../components/layout/seo";
import ExperienceList from "../../components/experience/experienceList";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

export const query = graphql`
  query experienceQuery {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//languages-and-libraries//" } }
      sort: { fields: frontmatter___yearsOfExp, order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            yearsOfExp
            featuredImage
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
        title="Experience"
        description="Descriptions of the work I do, as well as the languages and tech I've worked with"
        pathname={props.location.pathname}
      />
      <h1>Experience</h1>
      <p>
        I am providing both a summary of my experience with various tech,
        languages, and libraries, as well as a more detailed accounting of how
        I've worked with these things. Listing a language on a resume is only
        the beginning of the story and often doesn't provide an accurate picture
        of how a developer has actually used that language in practice.
      </p>
      <hr />
      <h2>Summary</h2>
      <h3>Full-stack developer: 4.5 years</h3>
      <p>
        I have formally been a developer for 4.5 years, but have done some
        front-end development for around 10 years. I have experience working
        with .NET, C#, SQL, HTML, CSS, and JS (various libraries). I have worked
        on everything from database design, stored procedures/views,
        replication, and ETL to APIs, services, and MVC applications to
        accessibility evaluation and remediation, as well as creating mock-ups,
        UI designs, site information architecture, and a style guide.
      </p>
      <h3>Research librarian: 9 years</h3>
      <p>
        Wait, why is this here? My work as a librarian helped me learn how folks
        look for and think about information and how it is organized. And while
        we didn't use full-on SQL databases, we did design and build databases
        using DBTextworks; this was my training ground for how to think about
        data structure. I also helped maintain the front-end code for the entire
        Division.
      </p>
      {/* <div>
        <a href="">
          <FontAwesomeIcon icon={faFilePdf} /> View my resume
        </a>
      </div> */}
      <hr />
      <h2>Languages, libraries, etc. I've worked with</h2>
      <ExperienceList data={props.data} />
    </Layout>
  );
};
