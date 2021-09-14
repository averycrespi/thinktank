import React, { useRef } from "react";
import { opponentOf, Player } from "../../logic/player";

interface ShareLinkProps {
  matchID: string;
  player: Player;
}

const ShareLink = ({ matchID, player }: ShareLinkProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const url = `${window.location.origin}/join/${matchID}/${opponentOf(player)}`;

  const copyToClipboard = (e: any) => {
    if (inputRef.current && document.queryCommandSupported("copy")) {
      inputRef.current.select();
      document.execCommand("copy");
      e.target.focus();
    }
  };

  return (
    <div className="row flex-center">
      <div className="col no-padding">
        <div className="form-group">
          <label>Share this link with your opponent:</label>
          <input
            className="input-block"
            type="text"
            readOnly
            value={url}
            ref={inputRef}
            onClick={copyToClipboard}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareLink;
