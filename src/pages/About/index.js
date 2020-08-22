import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/layout/seo";

export default props => {
  return (
    <Layout>
      <SEO
        title="About"
        description="A little more about me"
        pathname={props.location.pathname}
      />
      <h1>About</h1>
      <p>
        I'm a lifelong animal-lover, nerd, and Reno resident. When I'm not
        developing, I am spending time with my wife and animals, reading,
        writing, riding my bike, or snowboarding.
      </p>
      <p>
        I have master's degrees in Information Science and Creative Writing, and
        my undergraduate degree is in English Literature. Aside from a few
        classes in grad school, I am largely self-taught as a developer or have
        learned on the job.
      </p>
      <p>
        I occasionally write about the intersection of information science and
        science fiction/fantasy (and other assorted geekery) over at 
        <a href="https://scifibrarian.com">scifibrarian.com</a>
      </p>
    </Layout>
  );
};
