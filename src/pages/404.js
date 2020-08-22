import React from "react";
import Layout from "../components/layout";
import SEO from "../components/layout/seo";

const NotFoundPage = () => {
  if (typeof window !== "undefined") {
    return (
      <Layout>
        <SEO title={`404 - Not Found`} />
        <h1>Page Not Found</h1>
        <p>Try going back.</p>
      </Layout>
    );
  } else {
    return null;
  }
};

export default NotFoundPage;
