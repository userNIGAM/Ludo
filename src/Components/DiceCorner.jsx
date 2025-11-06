import { motion } from "framer-motion";
import { Dice6 } from "lucide-react";

export default function DiceCorner({
  color,
  currentPlayer,
  isRolling,
  dice,
  rollDice,
  winner,
  playerColors,
}) {
  const positions = {
    red: "top-6 left-6",
    blue: "top-6 right-6",

    green: "bottom-6 left-6",
    yellow: "bottom-6 right-6",
  };
  const isActive = currentPlayer === color;

  return (
    <motion.div
      className={`absolute ${positions[color]} z-30 flex flex-col items-center gap-2`}
      animate={{ scale: isActive ? 1.1 : 0.9, opacity: isActive ? 1 : 0.4 }}
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
        } ${!isActive || winner ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <div className="w-14 h-14 bg-linear-to-br from-gray-100 to-gray-300 rounded-xl shadow-inner flex items-center justify-center">
          {isActive ? (
            dice ? (
              <span className="text-2xl font-bold text-gray-800">{dice}</span>
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
        <span className="text-xs text-white/80 mt-1">Your turn!</span>
      )}
    </motion.div>
  );
}
