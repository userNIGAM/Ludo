import { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import Dice from "./Dice"; // You'll need a Dice component

export default function LudoGame() {
  // Initial tokens state
  const initialTokens = {
    red: [31, 34, 46, 49], // Home positions
    blue: [40, 43, 55, 58],
    green: [166, 169, 181, 184],
    yellow: [175, 178, 190, 193],
  };

  // Game state
  const [tokens, setTokens] = useState(initialTokens);
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [diceValue, setDiceValue] = useState(0);
  const [diceRolled, setDiceRolled] = useState(false);
  const [canRollDice, setCanRollDice] = useState(true);
  const [gameMessage, setGameMessage] = useState("Red's turn - Roll the dice!");

  // Roll dice function
  const rollDice = () => {
    if (!canRollDice) return;

    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newDiceValue);
    setDiceRolled(true);
    setCanRollDice(false);

    setGameMessage(
      `${currentPlayer} rolled ${newDiceValue}! Choose a token to move.`
    );

    // Check if player has any valid moves
    const hasMove = hasValidMove(tokens, currentPlayer, newDiceValue);
    if (!hasMove) {
      setGameMessage(
        `No valid moves for ${currentPlayer}. Turn passes to next player.`
      );
      // Auto-pass to next player after a delay if no moves
      setTimeout(nextTurn, 1500);
    }
  };

  // Move token function
  const moveToken = (color, tokenIndex) => {
    if (!diceRolled || color !== currentPlayer) {
      setGameMessage(`It's not ${color}'s turn!`);
      return;
    }

    // Use your existing moveTokenPosition function
    const newTokens = moveTokenPosition(tokens, color, tokenIndex, diceValue);
    setTokens(newTokens);

    // Check if player gets another turn (rolled 6)
    if (diceValue === 6) {
      setGameMessage(`${color} rolled 6! Roll again.`);
      setDiceRolled(false);
      setCanRollDice(true);
    } else {
      nextTurn();
    }

    // Check for winner
    if (checkWinner(newTokens, color)) {
      setGameMessage(`🎉 ${color.toUpperCase()} WINS THE GAME! 🎉`);
      setCanRollDice(false);
    }
  };

  // Move to next player
  const nextTurn = () => {
    const players = ["red", "blue", "yellow", "green"];
    const currentIndex = players.indexOf(currentPlayer);
    const nextPlayer = players[(currentIndex + 1) % players.length];

    setCurrentPlayer(nextPlayer);
    setDiceRolled(false);
    setCanRollDice(true);
    setGameMessage(`${nextPlayer}'s turn - Roll the dice!`);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* Game Info */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{gameMessage}</h2>
        <p className="text-lg">
          Current Player:{" "}
          <span className={`font-bold text-${currentPlayer}-600`}>
            {currentPlayer.toUpperCase()}
          </span>
        </p>
      </div>

      {/* Dice Component */}
      <Dice value={diceValue} onRoll={rollDice} disabled={!canRollDice} />

      {/* Game Board */}
      <GameBoard
        tokens={tokens}
        moveToken={moveToken}
        playerColors={playerColors}
        currentPlayer={currentPlayer}
        diceRolled={diceRolled}
      />

      {/* Player Tokens Summary */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {["red", "blue", "yellow", "green"].map((color) => (
          <div
            key={color}
            className={`p-3 rounded-lg text-center ${
              color === currentPlayer
                ? "ring-2 ring-white ring-opacity-50"
                : "opacity-70"
            } ${playerColors[color].bg}`}
          >
            <div className="font-bold text-white">{color.toUpperCase()}</div>
            <div className="text-white text-sm">
              Tokens:{" "}
              {
                tokens[color].filter(
                  (pos) => !homePositions[color].includes(pos)
                ).length
              }
              /4 on board
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
