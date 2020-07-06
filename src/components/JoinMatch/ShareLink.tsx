import { Player, opponentOf } from "../../logic";
import React, { useRef, useState } from "react";

interface ShareLinkProps {
  matchID: string;
  player: Player;
}

/** Share a link to join the game. */
const ShareLink = ({ matchID, player }: ShareLinkProps) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const url = `${window.location.origin}/join/${matchID}/${opponentOf(player)}`;

  const copyToClipboard = (e: any) => {
    if (inputRef.current && document.queryCommandSupported("copy")) {
      inputRef.current.select();
      document.execCommand("copy");
      e.target.focus();
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    }
  };

  return (
    <div className="row flex-center">
      <div className="col no-padding">
        <div className="form-group">
          <label>Share this link with your opponent (click to copy):</label>
          <input
            className="input-block"
            type="text"
            readOnly
            value={url}
            ref={inputRef}
            onClick={copyToClipboard}
          />
          {copied && (
            <div className="alert alert-success margin-top">
              Link copied to clipboard!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareLink;
