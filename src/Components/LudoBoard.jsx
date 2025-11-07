import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import GameBoard from "./GameBoard";
import DiceCorner from "./DiceCorner";
import WinnerPopup from "./WinnerPopup";

// 🧠 Import shared logic & data
import {
  paths,
  homePositions,
  playerColors,
  rollDiceValue,
  nextPlayer,
  hasValidMove,
  moveTokenPosition,
  checkWinner,
} from "./utils/gameLogic";

export default function LudoBoard() {
  // 🎲 Game state
  const [tokens, setTokens] = useState({
    red: [31, 34, 46, 49],
    blue: [40, 43, 55, 58],
    green: [166, 169, 181, 184],
    yellow: [175, 178, 190, 193],
  });

  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [dice, setDice] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  // 🎯 Handle dice roll animation and logic
  const rollDice = () => {
    if (winner || isRolling) return;

    setIsRolling(true);
    setGameStarted(true);

    let rolls = 0;
    const maxRolls = 8;
    let finalValue = 1;

    const rollInterval = setInterval(() => {
      const tempValue = rollDiceValue();
      setDice(tempValue);
      rolls++;

      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        finalValue = rollDiceValue(); // Get one final random value
        setDice(finalValue);

        setTimeout(() => {
          setIsRolling(false);
          if (!hasValidMove(tokens, currentPlayer, finalValue)) {
            // No valid moves → next player
            setDice(null);
            setCurrentPlayer(nextPlayer(currentPlayer));
          }
        }, 600);
      }
    }, 100);
  };

  // 🧩 Handle token movement
  const moveToken = (color, index) => {
    if (color !== currentPlayer || dice === null || winner || isRolling) {
      console.log(`Cannot move: ${color} token ${index}`, {
        currentPlayer,
        dice,
        winner,
        isRolling,
      });
      return;
    }

    console.log(`Attempting to move ${color} token ${index} with dice ${dice}`);

    const newTokens = moveTokenPosition(tokens, color, index, dice);
    setTokens(newTokens);

    // Check for winner
    if (checkWinner(newTokens, color)) {
      setWinner(color);
    }

    // Handle next turn
    setTimeout(() => {
      if (dice !== 6) {
        setCurrentPlayer(nextPlayer(currentPlayer));
      }
      setDice(null);
    }, 300);
  };

  // 🔄 Reset game to initial state
  const resetGame = () => {
    setTokens({
      red: [32, 33, 47, 48],
      blue: [41, 42, 56, 57],
      yellow: [167, 168, 182, 183],
      green: [176, 177, 191, 192],
    });
    setCurrentPlayer("red");
    setDice(null);
    setWinner(null);
    setGameStarted(false);
  };

  // 🧱 UI
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-white mb-2 tracking-wider">
          🎲 LUDO KING
        </h1>
        <p className="text-gray-300">
          Roll the dice and be the first to get all tokens home!
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex gap-8 items-start">
        <GameBoard
          tokens={tokens}
          moveToken={moveToken}
          playerColors={playerColors}
          dice={dice}
          isRolling={isRolling}
        />
      </div>

      {/* Corner Dice Buttons */}
      {["red", "blue", "green", "yellow"].map((color) => (
        <DiceCorner
          key={color}
          color={color}
          currentPlayer={currentPlayer}
          isRolling={isRolling}
          dice={dice}
          rollDice={rollDice}
          winner={winner}
          playerColors={playerColors}
        />
      ))}

      {/* Winner Modal */}
      <AnimatePresence>
        {winner && <WinnerPopup winner={winner} resetGame={resetGame} />}
      </AnimatePresence>
    </div>
  );
}
