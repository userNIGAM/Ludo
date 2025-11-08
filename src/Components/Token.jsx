import { motion } from "framer-motion";

export default function Token({ color, index, onClick, playerColors }) {
  return (
    <motion.div
      layout
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`w-5 h-5 rounded-full border-white shadow-lg cursor-pointer flex items-center justify-center text-white ${playerColors[color].bg}`}
    >
      {index + 1}
    </motion.div>
  );
}
