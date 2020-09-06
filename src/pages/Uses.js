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
      <p>This is a not-quite complete list of tech I use to develop</p>
      <h2>Software</h2>
      <p>
        Home: VSCode, Visual Studio 2019, GitKraken, Windows Terminal, Adobe
        Creative Cloud.
      </p>
      <p>
        Work: Visual Studio 2019, VSCode, SQL Server Management Studio, Azure
        Data Studio, Git bash, GitKraken, Windows Terminal, BeyondCompare,
        Notion, Microsoft Teams, IIS, Powershell.
      </p>
      <hr />
      <h2>Hardware</h2>
      <h3>PCs</h3>
      <p>
        Home: HP Omen 870-147c with an Intel i7-6700 processor with 4
        cores, 32GB RAM, 256 GB SSD, and 1TB HDD. Three monitors.
      </p>
      <p>
        Work: Dell Precision 5820 Tower with an Intel Xeon processor with 4
        cores, 32 GB RAM, 500 GB SSD, and 1 TB HDD. Three monitors (2 of which
        are 4k)
      </p>
      <h3>Keyboards</h3>
      <p>Home: I use an ErgoDox keyboard with Cherry Blue switches.</p>
      <p>Work: An X-bows Nature, also with Cherry Blue switches.</p>
      <h3>Other peripherals</h3>
      <p>I have an Anker vertical mouse for both home and work.</p>
      <p>
        At home, I use my Bose QC25 noise-cancelling headphones with a bluetooth
        dongle that also turns it into a headset. At work, I have a set of
        Status CB-1 headphones.
      </p>
      <hr />
      <h2>What this site is built with</h2>
      <p>This site is built Gatsby, MDX, CSS Grid, and FontAwesome.</p>
      <hr />
      <h2>Miscellaneous</h2>
      <p>
        Music: Wolf Parade, Sunset Rubdown, Depeche Mode, Tori Amos, the
        soundtracks of various films and TV, and so much more.
      </p>
      <p>
        My cats and bunnies. I almost always have company in my office of the
        furry variety.
      </p>
      <p>Coffee: latest favorite is Red Bay Coffee's Coltrane roast.</p>
    </Layout>
  );
};
