import React from "react";

interface HistoryProps {
  readonly history?: Array<string>;
}

const History = ({ history = new Array<string>() }: HistoryProps) => (
  <div id="history">
    <ul>
      {history.map((h) => (
        <li>{h}</li>
      ))}
    </ul>
  </div>
);

export default History;
