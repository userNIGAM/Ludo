import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export default function WinnerPopup({ winner, resetGame }) {
  return (
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
        <h2 className="text-4xl font-bold text-white mb-2">Congratulations!</h2>
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
  );
}
