import { Player, nameOf } from "../../logic";

import React from "react";
import ShareLink from "./ShareLink";
import { colorOf } from "../../utils/colorOf";

interface ModalProps {
  matchID: string;
  player: Player;
}

const Modal = ({ matchID, player }: ModalProps) => (
  <div>
    <input
      className="modal-state"
      id="modal-1"
      type="checkbox"
      defaultChecked
    />
    <div className="modal">
      {
        // Uncomment to enable the modal background.
        // TypeScript doesn't like custom attributes, so we need to ignore the following line.
        //@ts-ignore
        //<label className="modal-bg" for="modal-1"></label>
      }
      <div className="modal-body">
        <div className="row flex-center">
          <div className="col no-padding">
            <h4 className="modal-title">
              You are: <span className={colorOf(player)}>{nameOf(player)}</span>
            </h4>
          </div>
        </div>
        <ShareLink matchID={matchID} player={player} />
        <div className="row flex-center">
          <div className="col no-padding">
            {
              // TypeScript doesn't like custom attributes, so we need to ignore the following line.
              //@ts-ignore
              <label for="modal-1" class="modal-link">
                Dismiss
              </label>
            }
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
