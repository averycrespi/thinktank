import { Player, SimpleToken } from "../logic";

import React from "react";

interface HandProps {
  hand?: Map<SimpleToken, number>;
  player: Player;
}

const Hand = ({ hand = new Map<SimpleToken, number>(), player }: HandProps) => {
  let span = "";
  const tokens = [
    SimpleToken.Blocker,
    SimpleToken.Tank,
    SimpleToken.OrthogonalInfiltrator,
    SimpleToken.DiagonalInfiltrator,
    SimpleToken.Mine,
  ];
  for (const token of tokens) {
    span += token.repeat(hand.get(token) ?? 0);
  }
  const classes = [
    player === Player.Red ? "piece-red" : "",
    player === Player.Blue ? "piece-blue" : "",
  ];
  return (
    <div id="hand">
      <span>{"Hand: "}</span>
      <span className={classes.join(" ")}>{span}</span>
    </div>
  );
};

export default Hand;
