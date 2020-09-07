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
        writing, riding my bike, or snowboarding. I am a coffee and whiskey
        aficionado. I make tasty vegan baked goods.
      </p>
      <p>
        I have master's degrees in Information Science and Creative Writing, and
        my undergraduate degree is in English Literature. Aside from a few
        classes in grad school, I am largely self-taught as a developer or have
        learned on the job. I have an incurable case of imposter syndrome.
      </p>
      <p>
        I occasionally write about the intersection of information science and
        science fiction/fantasy (and other assorted geekery) over at {" "}
        <a href="https://scifibrarian.com">scifibrarian.com</a>
      </p>
      <h2>Values</h2>
      <p>Vegan (animals are not for our use). Love is love. Feminist (trans women are women). Black Lives Matter. Environmentally conscious. Wishes the world was more like Star Trek. Believes there's no such thing as a dumb question.</p>
      <h2>My heroes</h2>
      <p>Ellen Ripley. The whole Enterprise D crew. Captain Janeway. B'Elanna Torres. Seven of Nine. Dana Scully. Sarah Connor.</p>
    </Layout>
  );
};
