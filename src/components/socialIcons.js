import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faCodepen,
  faDev,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const SocialIcons = () => {
  return (
    <ul className="social">
      <li>
        <a href="https://github.com/dmtrek14">
          <FontAwesomeIcon icon={faGithub} />
          <span className="sr-only">Github profile</span>
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/danielle-mayabb-4066a4105/">
          <FontAwesomeIcon icon={faLinkedin} />
          <span className="sr-only">LinkedIn profile</span>
        </a>
      </li>
      <li>
        <a href="https://codepen.io/dmtrek14">
          <FontAwesomeIcon icon={faCodepen} />
          <span className="sr-only">Codepen profile</span>
        </a>
      </li>
      <li>
        <a href="https://dev.to/thescifibrarian">
          <FontAwesomeIcon icon={faDev} />
          <span className="sr-only">Dev profile</span>
        </a>
      </li>
      <li>
        <Link to="/Contact">
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="sr-only">Email contact form</span>
        </Link>
      </li>
    </ul>
  );
};

export default SocialIcons;
