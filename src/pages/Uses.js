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
      <p>Home: VSCode, Visual Studio 2019, GitKraken, Windows Terminal, Adobe Creative Cloud.</p>
      <p>Work: Visual Studio 2019, VSCode, SQL Server Management Studio, Azure Data Studio, Git bash, GitKraken, Windows Terminal, BeyondCompare, Notion, Microsoft Teams, IIS, Powershell.</p>
      <hr/>
      <h2>Hardware</h2>
      <p>My home PC is a Windows box &mdash; HP Omen 870-147c &mdash; with an Intel i7-6700 processor with 4 cores, 32GB RAM, 256 GM SSD, and 1TB HDD. At work, I have a Dell Precision 5820 Tower with an Intel Xeon processor with 4 cores, 32 GB RAM, 500 GB SSD, and 1 TB HDD.  Each setup has three monitors; at work, two monitors are 4K.</p>
      <p>I use an ErgoDox keyboard at home, and an Xbows at work. Both have Cherry Blue switches.</p>
      <p>I have an Anker vertical mouse for both home and work.</p>
      <p>At home, I use my Bose QC25 noise-cancelling headphones with a bluetooth dongle that also turns it into a headset. At work, I have a set of Status CB-1 headphones.</p>
      <hr/>
      <h2>What this site is built with</h2>
      <p>This site is built Gatsby, MDX, CSS Grid, and FontAwesome.</p>
      <hr/>
      <h2>Miscellaneous</h2>
      <p>Music: Wolf Parade, Sunset Rubdown, Depeche Mode, Tori Amos, the soundtracks of various films and TV, and so much more.</p>
      <p>My cats and bunnies. I almost always have company in my office of the furry variety.</p>
      <p>Coffee: latest favorite is Red Bay Coffee's Coltrane roast.</p>
    </Layout>
  );
};
