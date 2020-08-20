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
    const experienceTemplate = path.resolve("src/templates/experience.js");
    //const projectTemplate = path.resolve("");
    const result = await graphql(`
   query {
    languages: allMdx {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
    projects: allMdx {
        edges {
            node {
                frontmatter {
                    title
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

  languages.foreach(({node}) => {
    createPage({
      path: node.fields.slug,
      component: experienceTemplate,
      context: {
        slug: node.fields.slug
      },
    })
  })
}