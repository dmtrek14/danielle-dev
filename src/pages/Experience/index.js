import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/layout/seo";
import ExperienceList from "../../components/experience/experienceList";

export const query = graphql`
  query experienceQuery {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//languages-and-libraries//" } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            icon
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
        Likewise, using a progress bar or 1-10 rating for skills is equally
        useless, which is why I've taken a more narrative approach here.
      </p>
      <hr />
      <h2>Summary</h2>
      <p>
        I have formally been a developer for 4.5 years, but have done some
        amount of development for around 10 years. I have experience working with
        .NET, C#, SQL, HTML, CSS, and JS (various libraries). I have worked on everything from
        database design, stored procedures/views, replication, and ETL to APIs,
        services, and MVC applications to accessibility evaluation and
        remediation, as well as creating mock-ups, UI designs, site information
        architecture, and a style guide.
      </p>
      <div><a href="">View my resume</a></div>
      <hr />
      <h2>Languages, libraries, etc. I've worked with</h2>
      <ExperienceList data={props.data} />
    </Layout>
  );
};
