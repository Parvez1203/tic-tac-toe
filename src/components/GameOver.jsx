import React from "react";

export default function GameOver({ winner, resetGame }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's A Draw!</p>}
      <button onClick={resetGame}>Rematch!</button>
    </div>
  );
}
