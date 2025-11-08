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
    red: homePositions.red,
    blue: homePositions.blue,
    yellow: homePositions.yellow,
    green: homePositions.green,
  });

  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [dice, setDice] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [hasRolledSix, setHasRolledSix] = useState(false);

  // 🎯 Handle dice roll animation and logic - FIXED
  const rollDice = () => {
    if (winner || isRolling) return;

    setIsRolling(true);
    setGameStarted(true);

    let rolls = 0;
    const maxRolls = 8;

    const rollInterval = setInterval(() => {
      const tempValue = rollDiceValue();
      setDice(tempValue);
      rolls++;

      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        const finalValue = rollDiceValue();
        setDice(finalValue);

        setTimeout(() => {
          setIsRolling(false);

          // If player rolled a 6, they get another turn
          if (finalValue === 6) {
            setHasRolledSix(true);
            console.log(
              `🎲 ${currentPlayer} rolled a 6! They get another turn.`
            );
          }

          // Check if no valid moves
          if (!hasValidMove(tokens, currentPlayer, finalValue)) {
            console.log(
              `❌ No valid moves for ${currentPlayer} with dice ${finalValue}`
            );
            setDice(null);
            // Only change turn if they didn't roll a 6
            if (finalValue !== 6) {
              setCurrentPlayer(nextPlayer(currentPlayer));
              setHasRolledSix(false);
            }
          } else {
            console.log(
              `✅ ${currentPlayer} has valid moves with dice ${finalValue}`
            );
          }
        }, 600);
      }
    }, 100);
  };

  // 🧩 Handle token movement - FIXED
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

    console.log(`🎯 Moving ${color} token ${index} with dice ${dice}`);

    const newTokens = moveTokenPosition(tokens, color, index, dice);
    setTokens(newTokens);

    // Check for winner
    if (checkWinner(newTokens, color)) {
      setWinner(color);
    }

    // Handle next turn - FIXED: Only change turn if not a 6
    setTimeout(() => {
      if (dice === 6) {
        console.log(`🔄 ${color} rolled a 6, they get another roll!`);
        setDice(null);
        setHasRolledSix(true);
        // Player gets another roll, don't change turn
      } else {
        console.log(`🔄 Changing turn from ${color} to ${nextPlayer(color)}`);
        setCurrentPlayer(nextPlayer(color));
        setDice(null);
        setHasRolledSix(false);
      }
    }, 500);
  };

  // 🔄 Reset game to initial state
  const resetGame = () => {
    setTokens({
      red: homePositions.red,
      blue: homePositions.blue,
      yellow: homePositions.yellow,
      green: homePositions.green,
    });
    setCurrentPlayer("red");
    setDice(null);
    setWinner(null);
    setGameStarted(false);
    setHasRolledSix(false);
  };

  // 🧱 UI
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      {/* <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-white mb-2 tracking-wider">
          🎲 LUDO KING
        </h1>
        <p className="text-gray-300">
          Roll the dice and be the first to get all tokens home!
        </p> */}

      {/* Game Status */}
      {/* </div> */}

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
