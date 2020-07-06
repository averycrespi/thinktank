import React from "react";
import { Token } from "../../logic";
import TokenIcon from "../Board/TokenIcon";

/** Render a cheatsheet. */
const Cheatsheet = () => (
  <div className="row flex-center">
    <div
      className="col no-padding"
      style={{ textAlign: "center", wordWrap: "break-word" }}
    >
      <h2>Cheatsheet</h2>
      <table>
        <thead>
          <th>Name</th>
          <th>Icon</th>
          <th>Description</th>
          <th>Movement</th>
          <th>Vulnerable to</th>
        </thead>
        <tbody>
          <tr>
            <td>Blocker</td>
            <td>
              <TokenIcon token={Token.Blocker} />
            </td>
            <td>Protects your pieces from enemy tanks.</td>
            <td>1 space</td>
            <td>
              <TokenIcon token={Token.OrthogonalInfiltrator} />
              /<TokenIcon token={Token.DiagonalInfiltrator} />
            </td>
          </tr>
          <tr>
            <td>Tank</td>
            <td>
              <TokenIcon token={Token.UpTank} />
              /<TokenIcon token={Token.DownTank} />
              /<TokenIcon token={Token.LeftTank} />
              /<TokenIcon token={Token.RightTank} />
            </td>
            <td>Shoots enemy pieces (in a single direction).</td>
            <td>1 horizontal/vertical space</td>
            <td>
              <TokenIcon token={Token.UpTank} />
              /<TokenIcon token={Token.OrthogonalInfiltrator} />
              /<TokenIcon token={Token.DiagonalInfiltrator} />
              /<TokenIcon token={Token.Mine} />
            </td>
          </tr>
          <tr>
            <td>Infiltrator (+)</td>
            <td>
              <TokenIcon token={Token.OrthogonalInfiltrator} />
            </td>
            <td>Captures adjacent enemy pieces.</td>
            <td>1 horizontal/vertical space</td>
            <td>
              <TokenIcon token={Token.UpTank} />
              /<TokenIcon token={Token.Mine} />
            </td>
          </tr>
          <tr>
            <td>Infiltrator (X)</td>
            <td>
              <TokenIcon token={Token.DiagonalInfiltrator} />
            </td>
            <td>Captures adjacent enemy pieces.</td>
            <td>1 diagonal space</td>
            <td>
              <TokenIcon token={Token.UpTank} />
              /<TokenIcon token={Token.Mine} />
            </td>
          </tr>
          <tr>
            <td>Mine</td>
            <td>
              <TokenIcon token={Token.Mine} />
            </td>
            <td>Explodes adjacent enemy (and friendly) pieces.</td>
            <td>2 spaces (can jump)</td>
            <td>
              <TokenIcon token={Token.UpTank} />
              /<TokenIcon token={Token.Mine} />
            </td>
          </tr>
          <tr>
            <td>Base</td>
            <td>
              <TokenIcon token={Token.Base} />
            </td>
            <td>Protect your base at all costs!</td>
            <td>1 space (within home area)</td>
            <td>
              <TokenIcon token={Token.UpTank} />
              /<TokenIcon token={Token.Mine} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default Cheatsheet;
