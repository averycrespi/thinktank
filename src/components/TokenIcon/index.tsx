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

interface TokenIconProps {
  token: Token;
}

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

/** Renders a token as an icon. */
const TokenIcon = ({ token }: TokenIconProps) => (
  <FontAwesomeIcon icon={toIconDefinition(token)} />
);

export default TokenIcon;
