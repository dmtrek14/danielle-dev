

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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Danielle Mayabb - Developer",
        short_name: "Danielle Mayabb - Developer",
        start_url: "/",
        background_color: "#f0f0f0",
        theme_color: "#30415b",
        display: "standalone",
       // icon: "src/images/icon.png",
        //crossOrigin: `anonymous`
      }
    },
    'gatsby-plugin-offline'
  ],
}