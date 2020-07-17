import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const repository = "https://github.com/averycrespi/thinktank";

const Credits = () => (
  <div className="row flex-center">
    <div className="col" style={{ textAlign: "center" }}>
      <p>
        Made with{" "}
        <span className="red">
          <FontAwesomeIcon icon={faHeart} />
        </span>{" "}
        by Avery Crespi
      </p>
      <a href={repository} className="no-underline">
        Explore the project on <FontAwesomeIcon icon={faGithub} /> GitHub
      </a>
    </div>
  </div>
);

export default Credits;
