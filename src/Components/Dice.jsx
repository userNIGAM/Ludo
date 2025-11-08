import { motion } from "framer-motion";

export default function Dice({ value, onRoll, disabled }) {
  const diceFaces = {
    1: "⚀",
    2: "⚁",
    3: "⚂",
    4: "⚃",
    5: "⚄",
    6: "⚅",
  };

  return (
    <motion.button
      onClick={onRoll}
      disabled={disabled}
      className={`
        text-6xl p-4 rounded-2xl border-4 
        ${
          disabled
            ? "bg-gray-400 border-gray-500 cursor-not-allowed opacity-50"
            : "bg-white border-amber-300 cursor-pointer hover:bg-amber-50"
        }
        transition-all duration-200
      `}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      animate={
        !disabled
          ? {
              rotate: [0, -10, 10, -5, 5, 0],
              transition: { duration: 2, repeat: Infinity },
            }
          : {}
      }
    >
      {value > 0 ? diceFaces[value] : "🎲"}
    </motion.button>
  );
}
