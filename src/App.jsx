import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function derivewinner(gameBoard, player) {
  let winner;
  console.log(gameBoard);

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [player, setPlayer] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const onNameEdit = (name, symbol) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [symbol]: name,
    }));
  };

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = derivewinner(gameBoard, player);
  const hasDraw = gameTurns.length == 9 && !winner;
  function onSelectSquare(rowIndex, colIndex) {
    setGameTurns((previousTurns) => {
      const currentPlayer = deriveActivePlayer(previousTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
          playerName: player[currentPlayer],
        },
        ...previousTurns,
      ];

      return updatedTurns;
    });
  }

  function resetGame() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={player.X}
            symbol="X"
            activePlayer={activePlayer}
            setPlayer={onNameEdit}
          />
          <Player
            initialName={player.O}
            symbol="O"
            activePlayer={activePlayer}
            setPlayer={onNameEdit}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} resetGame={resetGame} />
        )}
        <GameBoard onSelectSquare={onSelectSquare} board={gameBoard} />
        <Log turns={gameTurns} />
      </div>
    </main>
  );
}

export default App;
