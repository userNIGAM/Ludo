import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dice6, Trophy, Home, Users, RotateCcw } from "lucide-react";

export default function LudoBoard() {
  // 🎯 Define all player paths (same as before)
  const paths = {
    red: [
      91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99,
      100, 101, 102, 103, 104, 119, 134, 133, 132, 131, 130, 129, 143, 158, 173,
      188, 203, 218, 217, 216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121,
      120, 105, 106, 107, 108, 109, 110, 111,
    ],
    blue: [
      23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 134, 133, 132, 131,
      130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186, 171, 156, 141,
      125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 81, 66, 51, 36,
      21, 6, 7, 22, 37, 52, 67, 82, 97,
    ],
    green: [
      133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186,
      171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95,
      81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103,
      104, 119, 118, 117, 116, 115, 114, 113,
    ],
    yellow: [
      201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92,
      93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101,
      102, 103, 104, 119, 134, 133, 132, 131, 130, 129, 143, 158, 173, 188, 203,
      218, 217, 202, 187, 172, 157, 142, 127,
    ],
  };

  const homePositions = {
    red: [32, 33, 47, 48],
    blue: [41, 42, 56, 57],
    yellow: [167, 168, 182, 183],
    green: [176, 177, 191, 192],
  };

  const [tokens, setTokens] = useState({
    red: [32, 33, 47, 48],
    blue: [41, 42, 56, 57],
    yellow: [167, 168, 182, 183],
    green: [176, 177, 191, 192],
  });

  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [dice, setDice] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const playerColors = {
    red: {
      bg: "bg-red-500",
      light: "bg-red-200",
      text: "text-red-700",
      border: "border-red-400",
    },
    blue: {
      bg: "bg-blue-500",
      light: "bg-blue-200",
      text: "text-blue-700",
      border: "border-blue-400",
    },
    green: {
      bg: "bg-green-500",
      light: "bg-green-200",
      text: "text-green-700",
      border: "border-green-400",
    },
    yellow: {
      bg: "bg-yellow-500",
      light: "bg-yellow-200",
      text: "text-yellow-700",
      border: "border-yellow-400",
    },
  };

  const rollDice = () => {
    if (winner || isRolling) return;

    setIsRolling(true);
    setGameStarted(true);

    let rolls = 0;
    const maxRolls = 8;

    const rollInterval = setInterval(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
      rolls++;
      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        setIsRolling(false);

        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDice(finalValue);

        // ✅ Check if current player has any valid move
        setTimeout(() => {
          if (!hasValidMove(currentPlayer, finalValue)) {
            // No valid move → next player's turn
            setDice(null);
            setCurrentPlayer(nextPlayer(currentPlayer));
          }
        }, 600);
      }
    }, 100);
  };

  const moveToken = (color, index) => {
    if (color !== currentPlayer || dice === null || winner || isRolling) return;

    setTokens((prev) => {
      const newPositions = [...prev[color]];
      const currentPos = newPositions[index];
      const path = paths[color];
      const startPos = path[0];

      // Move from home to start on 6
      if (homePositions[color].includes(currentPos)) {
        if (dice === 6) {
          newPositions[index] = startPos;
        } else {
          return prev; // invalid move
        }
      } else {
        const currentIndex = path.indexOf(currentPos);
        if (currentIndex !== -1 && currentIndex + dice < path.length) {
          newPositions[index] = path[currentIndex + dice];
        } else if (currentIndex + dice === path.length - 1) {
          newPositions[index] = path[path.length - 1];
        } else {
          return prev; // invalid move
        }
      }

      // Check win condition
      if (newPositions.every((pos) => pos === path[path.length - 1])) {
        setWinner(color);
      }

      return { ...prev, [color]: newPositions };
    });

    // Handle turn logic
    setTimeout(() => {
      if (dice !== 6) {
        setCurrentPlayer(nextPlayer(currentPlayer));
      }
      setDice(null);
    }, 300);
  };

  const nextPlayer = (color) => {
    const order = ["red", "blue", "green", "yellow"];
    return order[(order.indexOf(color) + 1) % order.length];
  };

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

  const redZone = [
    0, 1, 2, 3, 4, 5, 15, 20, 30, 35, 45, 50, 60, 65, 75, 76, 77, 78, 79, 80,
  ];
  const blueZone = [
    9, 10, 11, 12, 13, 14, 24, 29, 39, 44, 54, 59, 69, 74, 84, 85, 86, 87, 88,
    89,
  ];
  const greenZone = [
    144, 145, 146, 147, 148, 149, 159, 164, 174, 179, 189, 194, 204, 209, 219,
    220, 221, 222, 223, 224,
  ];
  const yellowZone = [
    135, 136, 137, 138, 139, 140, 150, 155, 165, 170, 180, 185, 195, 200, 210,
    211, 212, 213, 214, 215,
  ];

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

      <div className="flex gap-8 items-start">
        {/* Game Info Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-64 border border-white/20">
          <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Game Info
          </h2>

          <div className="space-y-3">
            {Object.entries(playerColors).map(([color, styles]) => (
              <div
                key={color}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  currentPlayer === color
                    ? `${styles.border} ${styles.light} scale-105 shadow-lg`
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold capitalize ${styles.text}`}>
                    {color} Player
                  </span>
                  <div className="flex gap-1">
                    {tokens[color].map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${styles.bg} border border-white`}
                      />
                    ))}
                  </div>
                </div>
                {currentPlayer === color && (
                  <p className="text-xs text-white mt-1">Your turn!</p>
                )}
              </div>
            ))}
          </div>

          {/* Game Controls */}
          <div className="mt-6 space-y-3">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={rollDice}
              disabled={isRolling || winner}
              className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 ${
                isRolling
                  ? "bg-gray-500"
                  : "bg-linear-to-r from-purple-600 to-blue-600"
              }`}
            >
              <Dice6 className="w-5 h-5" />
              {isRolling ? "Rolling..." : "Roll Dice"}
            </motion.button> */}
            {/* Dice Displays in Corners */}
            {["red", "blue", "green", "yellow"].map((color) => {
              const positions = {
                red: "top-6 left-6",
                blue: "top-6 right-6",
                yellow: "bottom-6 right-6",
                green: "bottom-6 left-6",
              };

              const isActive = currentPlayer === color;

              return (
                <motion.div
                  key={color}
                  className={`absolute ${positions[color]} z-30 flex flex-col items-center gap-2`}
                  animate={{
                    scale: isActive ? 1.1 : 0.9,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    whileHover={isActive ? { scale: 1.1 } : {}}
                    whileTap={isActive ? { scale: 0.9 } : {}}
                    disabled={!isActive || isRolling || winner}
                    onClick={rollDice}
                    animate={{
                      rotate: isActive && isRolling ? 360 : 0,
                      scale: isActive && isRolling ? 1.2 : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: isActive && isRolling ? Infinity : 0,
                    }}
                    className={`bg-white rounded-2xl p-3 shadow-xl border-4 cursor-pointer ${
                      playerColors[color].border
                    } ${
                      !isActive || winner ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    <div className="w-14 h-14 bg-linear-to-br from-gray-100 to-gray-300 rounded-xl shadow-inner flex items-center justify-center">
                      {isActive ? (
                        dice ? (
                          <span className="text-2xl font-bold text-gray-800">
                            {dice}
                          </span>
                        ) : (
                          <Dice6 className="w-7 h-7 text-gray-400" />
                        )
                      ) : (
                        <Dice6 className="w-7 h-7 text-gray-300 opacity-60" />
                      )}
                    </div>
                  </motion.button>
                  <span
                    className={`text-sm font-semibold capitalize ${playerColors[color].text}`}
                  >
                    {color}
                  </span>
                  {isActive && !winner && (
                    <span className="text-xs text-white/80 mt-1">
                      Your turn!
                    </span>
                  )}
                </motion.div>
              );
            })}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="w-full py-3 rounded-xl font-bold bg-linear-to-r from-gray-600 to-gray-700 text-white flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Game
            </motion.button>
          </div>
        </div>

        {/* Game Board */}
        <div className="relative">
          <div className="relative grid grid-cols-15 w-[600px] h-[600px] border-8 border-amber-800 rounded-3xl shadow-2xl overflow-hidden bg-amber-900">
            {[...Array(225)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`border border-amber-700/30 relative flex items-center justify-center
                  ${redZone.includes(index) ? "bg-red-500/20" : ""}
                  ${blueZone.includes(index) ? "bg-blue-500/20" : ""}
                  ${greenZone.includes(index) ? "bg-green-500/20" : ""}
                  ${yellowZone.includes(index) ? "bg-yellow-500/20" : ""}
                  ${
                    [
                      56, 57, 66, 67, 76, 77, 86, 87, 157, 158, 167, 168, 177,
                      178, 187, 188,
                    ].includes(index)
                      ? "bg-white/10"
                      : ""
                  }
                `}
              >
                {/* Center Star */}
                {index === 112 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-linear-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg" />
                  </div>
                )}

                {/* Render tokens */}
                {Object.entries(tokens).map(([color, positions]) =>
                  positions.map((pos, i) =>
                    pos === index ? (
                      <motion.div
                        key={`${color}-${i}`}
                        layout
                        onClick={() => moveToken(color, i)}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.8 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center text-xs font-bold text-white ${playerColors[color].bg}`}
                      >
                        {i + 1}
                      </motion.div>
                    ) : null
                  )
                )}
              </motion.div>
            ))}
          </div>

          {/* Dice Display */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{
                rotate: isRolling ? 360 : 0,
                scale: isRolling ? 1.2 : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: isRolling ? Infinity : 0,
              }}
              className="bg-white rounded-2xl p-4 shadow-2xl border-4 border-amber-300"
            >
              <div className="w-16 h-16 bg-linear-to-br from-gray-100 to-gray-300 rounded-xl shadow-inner flex items-center justify-center">
                {dice ? (
                  <span className="text-2xl font-bold text-gray-800">
                    {dice}
                  </span>
                ) : (
                  <Dice6 className="w-8 h-8 text-gray-400" />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Winner Popup */}
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-linear-to-br from-yellow-400 to-amber-500 p-8 rounded-3xl shadow-2xl text-center border-4 border-white"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Trophy className="w-10 h-10 text-yellow-500" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Congratulations!
              </h2>
              <p className="text-2xl font-semibold text-white mb-6 capitalize">
                {winner} Player Wins!
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={resetGame}
                className="bg-white text-amber-600 px-8 py-3 rounded-xl font-bold text-lg shadow-lg"
              >
                Play Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Started Indicator */}
      {gameStarted && !winner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-lg"
        >
          <span className="capitalize">{currentPlayer}</span>'s turn
          {dice && ` • Rolled: ${dice}`}
        </motion.div>
      )}
    </div>
  );
}
