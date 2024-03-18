import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  activePlayer,
  setPlayer,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function toggleEdit() {
    setIsEditing((isEditing) => !isEditing);
  }

  function savePlayerName(inputName, symbol) {
    setPlayer(inputName, symbol);
    toggleEdit();
  }

  const playerNameElement = isEditing ? (
    <input
      type="text"
      required
      value={playerName}
      onChange={(e) => setPlayerName(e.target.value)}
    />
  ) : (
    <span className="player-name">{playerName}</span>
  );

  return (
    <li className={activePlayer == symbol ? "active" : undefined}>
      <span className="player">
        {playerNameElement}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button
        onClick={
          isEditing ? () => savePlayerName(playerName, symbol) : toggleEdit
        }
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
