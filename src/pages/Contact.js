import React from "react";
import Layout from "../components/layout";
import SEO from "../components/layout/seo";

export default props => {
  return (
    <Layout>
      <SEO
        title="Contact"
        description="Email contact form"
        pathname={props.location.pathname}
      />
      <h1>Contact</h1>
      <p>Use the form below to get in touch.</p>
    </Layout>
  );
};
