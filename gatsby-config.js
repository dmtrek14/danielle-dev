

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
    `gatsby-plugin-mdx`,
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
