const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode});
    createNodeField({
      node, 
      name: `slug`,
      value: slug,
    });
   }
}


exports.createPages = async ({graphql, actions})=> { 
    const { createPage } = actions;
    const experienceAndProjectTemplate = path.resolve("src/templates/experienceAndProject.js");

    const result = await graphql(`
    query {
      languages: allMdx (filter: {fileAbsolutePath: {regex: "//languages-and-libraries//"}})  {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
      projects: allMdx (filter: {fileAbsolutePath: {regex: "//projects//"}})  {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              isCurrent
            }
          }
        }
      }
    }  
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  
  var languages = result.data.languages.edges;
  var projects = result.data.projects.edges;

  languages.forEach(({node}) => {
    createPage({
      path: `/Experience/languages-and-libraries${node.fields.slug}`,
      component: experienceAndProjectTemplate,
      context: {
        slug: node.fields.slug,
        id: node.id
      },
    })
  })

  projects.forEach(({node}) => {
    createPage({
      path: `/Work/projects${node.fields.slug}`,
      component: experienceAndProjectTemplate,
      context: {
        slug: node.fields.slug,
        id: node.id
      },
    })
  })

}