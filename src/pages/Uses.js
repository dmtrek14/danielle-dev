import React from "react";
import Layout from "../components/layout";
import SEO from "../components/layout/seo";

export default props => {
  return (
    <Layout>
      <SEO
        title="Uses"
        description="A list of all the tech I use"
        pathname={props.location.pathname}
      />
      <h1>Uses</h1>
      <p>Technology I use.</p>
      <h2>Software</h2>
      <hr/>
      <h2>Hardware</h2>
      <hr/>
      <h2>What this site is built with</h2>
    </Layout>
  );
};
