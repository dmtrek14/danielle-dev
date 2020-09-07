import React from "react";
import Layout from "../components/layout";
import SEO from "../components/layout/seo";
import "../components/layout/form.css"

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
      <hr/>
      <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact"/>
        <span hidden><input name="bot-field" aria-hidden="true" aria-label="field to screen bots, do not fill in"/></span>     
        <label for="name">Your name</label>
        <input id="name" type="text" name="name"/>
        <label for="email">Your email</label>
        <input id="email" type="email" name="email"/>
        <label for="email-body">What would you like to talk to me about?</label>
        <textarea id="email-body" rows="10"/>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};
