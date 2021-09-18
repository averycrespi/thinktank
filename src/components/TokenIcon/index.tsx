import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBomb,
  faHome,
  faPlus,
  faShieldAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Token } from "../../logic/token";

interface TokenIconProps {
  token: Token;
}

const TokenIcon = ({ token }: TokenIconProps) => {
  switch (token) {
    case Token.Blocker:
      return <FontAwesomeIcon icon={faShieldAlt} />;
    case Token.UpTank:
      return <FontAwesomeIcon icon={faArrowUp} />;
    case Token.DownTank:
      return <FontAwesomeIcon icon={faArrowDown} />;
    case Token.LeftTank:
      return <FontAwesomeIcon icon={faArrowLeft} />;
    case Token.RightTank:
      return <FontAwesomeIcon icon={faArrowRight} />;
    case Token.CardinalInfiltrator:
      return <FontAwesomeIcon icon={faPlus} />;
    case Token.DiagonalInfiltrator:
      return <FontAwesomeIcon icon={faTimes} />;
    case Token.Mine:
      return <FontAwesomeIcon icon={faBomb} />;
    case Token.Base:
      return <FontAwesomeIcon icon={faHome} />;
  }
};

export default TokenIcon;
