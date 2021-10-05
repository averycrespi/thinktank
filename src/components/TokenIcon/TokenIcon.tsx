import { IconDefinition } from "@fortawesome/fontawesome-common-types";
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

const toIconDefinition = (token: Token): IconDefinition => {
  switch (token) {
    case Token.Blocker:
      return faShieldAlt;
    case Token.UpTank:
      return faArrowUp;
    case Token.DownTank:
      return faArrowDown;
    case Token.LeftTank:
      return faArrowLeft;
    case Token.RightTank:
      return faArrowRight;
    case Token.CardinalInfiltrator:
      return faPlus;
    case Token.DiagonalInfiltrator:
      return faTimes;
    case Token.Mine:
      return faBomb;
    case Token.Base:
      return faHome;
  }
};

interface TokenIconProps {
  token: Token;
}

/** Renders a token as a Font Awesome icon. */
const TokenIcon = ({ token }: TokenIconProps) => (
  <span className="token-icon">
    <FontAwesomeIcon icon={toIconDefinition(token)} />
  </span>
);

export default TokenIcon;
