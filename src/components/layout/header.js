import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

const Header = ({ profileImage }) => {
  let websiteTheme;
  if (typeof window !== `undefined`) {
    websiteTheme = window.__theme;
  }

  const [theme, setTheme] = useState(websiteTheme);

  useEffect(() => {
    setTheme(window.__theme);
    window.__onThemeChange = () => {
      setTheme(window.__theme);
    };
  }, []);

  const ThemeToggle = () => {
    window.__setPreferredTheme(websiteTheme === "dark" ? "light" : "dark");
  };
  return (
    <header>
      <nav>
        <a href="#main-content" className="skip">
          Skip to main
        </a>
        <div>
          <Img
            className="nav-photo"
            fixed={profileImage}
            alt="headshot of Danielle"
            style={{ display: "inherit" }}
            fadeIn={true}
          />
        </div>
        <div className="site-name">
          <Link to="/">Danielle Mayabb</Link>
        </div>
        <div className="site-name-short">
          <Link to="/">DM</Link>
        </div>
        <div className="site-links">
          <Link to="/Work">Work</Link>
          <Link to="/Experience">Experience</Link>
          <Link to="/About">About</Link>
          <span>
            <button
              onClick={ThemeToggle}
              className={
                theme === "dark" ? "toggle dark-toggle" : "toggle light-toggle"
              }
            >
              <span className="sr-only">Toggle theme</span>
            </button>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
