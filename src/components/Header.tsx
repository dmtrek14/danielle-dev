
import { h, Fragment } from 'preact';
import {useState, useEffect} from 'preact/hooks'
import '../Styles/Header.scss'

export default function Header() {
    let websiteTheme;
    if (typeof window !== `undefined`) {
      //websiteTheme = window.__theme;
    }
  
    const [theme, setTheme] = useState(websiteTheme);
  
    // useEffect(() => {
    //   setTheme(window.__theme);
    //   window.__onThemeChange = () => {
    //     setTheme(window.__theme);
    //   };
    // }, []);
//     <svg height="27" width="27">
//   <circle cx="13" cy="13" r="11" stroke="black" stroke-width="1" fill="#d1872c"></circle>
//    <svg height="23" width="23">
//    <circle cx="13" cy="13" r="8" fill="black"/>
//    </svg> 
// </svg> 

// <svg height="27" width="27">
//   <circle cx="13" cy="13" r="11" fill="black"></circle>
//    <svg height="23" width="23">
//    <circle cx="13" cy="13" r="8" fill="#d1872c"/>
//    </svg> 
// </svg> 
  
    const ThemeToggle = () => {
      //window.__setPreferredTheme(websiteTheme === "dark" ? "light" : "dark");
    };

    return (
      <header>
        <nav>
          <a href="#main-content" className="skip">
            Skip to main
          </a>
          <div>
            <div class="nav-photo">
              <img
              src="/assets/profile-photo.jpg"
              class="nav-photo"
              width="60"
              alt="headshot of Danielle"
              style={{ display: "inherit" }}
            />
            </div>
            
          </div>
          <div class="site-name">
            <a href="/">Danielle Mayabb</a>
          </div>
          <div class="site-name-short">
            <a href="/">DM</a>
          </div>
          <div class="site-links">
            <a href="/Work">Work</a>
            <a href="/Experience">Experience</a>
            <a href="/About">About</a>
            <span>
              <button
                onClick={ThemeToggle}
                class={
                  theme === "dark" ? "toggle dark-toggle" : "toggle light-toggle"
                }
              >
                <span class="sr-only">Toggle theme</span>
              </button>
            </span>
          </div>
        </nav>
      </header>
    )
}

