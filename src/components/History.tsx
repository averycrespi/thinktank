import React from "react";

interface HistoryProps {
  history?: Array<string>;
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
