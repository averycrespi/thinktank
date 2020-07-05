import {
  faBomb,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faCaretUp,
  faHome,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Token } from "../../logic";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

interface TokenIconProps {
  token: Token;
}

/** Render a token as an icon. */
const TokenIcon = ({ token }: TokenIconProps) => {
  switch (token) {
    case Token.Blocker:
      return <FontAwesomeIcon icon={faCircle} />;
    case Token.UpTank:
      return <FontAwesomeIcon icon={faCaretUp} />;
    case Token.DownTank:
      return <FontAwesomeIcon icon={faCaretDown} />;
    case Token.LeftTank:
      return <FontAwesomeIcon icon={faCaretLeft} />;
    case Token.RightTank:
      return <FontAwesomeIcon icon={faCaretRight} />;
    case Token.OrthogonalInfiltrator:
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
