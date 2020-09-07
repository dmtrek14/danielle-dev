

module.exports = {
  siteMetadata: {
    siteLanguage: `en`,
      title: `Danielle Mayabb - Developer`,
      description: `Personal developer website of Danielle Mayabb`,
      author: `Danielle Mayabb`,
      siteUrl: `https://daniellem.dev`
    },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
             //path: `${__dirname}/src/images`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `languages`,
        path: `${__dirname}/experience-and-projects/languages-and-libraries/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/experience-and-projects/projects/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Danielle Mayabb - Developer",
        short_name: "Danielle Mayabb - Developer",
        start_url: "/",
        background_color: "#fffae6",
        theme_color: "#353430",
        display: "standalone",
        icon: "src/images/icon.png",
        icon_options: {
          purpose: `maskable`
        }
      }
    },
    'gatsby-plugin-offline'
  ],
}
