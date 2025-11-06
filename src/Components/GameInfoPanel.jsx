// import { motion } from "framer-motion";
// import { Users, RotateCcw } from "lucide-react";

// export default function GameInfoPanel({
//   playerColors,
//   tokens,
//   currentPlayer,
//   winner,
//   isRolling,
//   rollDice,
//   resetGame,
// }) {
//   return (
//     <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-64 border border-white/20">
//       <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
//         <Users className="w-5 h-5" /> Game Info
//       </h2>

//       <div className="space-y-3">
//         {Object.entries(playerColors).map(([color, styles]) => (
//           <div
//             key={color}
//             className={`p-3 rounded-xl border-2 transition-all duration-300 ${
//               currentPlayer === color
//                 ? `${styles.border} ${styles.light} scale-105 shadow-lg`
//                 : "bg-white/5 border-white/10"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <span className={`font-semibold capitalize ${styles.text}`}>
//                 {color} Player
//               </span>
//               <div className="flex gap-1">
//                 {tokens[color].map((_, i) => (
//                   <div
//                     key={i}
//                     className={`w-3 h-3 rounded-full ${styles.bg} border border-white`}
//                   />
//                 ))}
//               </div>
//             </div>
//             {currentPlayer === color && (
//               <p className="text-xs text-white mt-1">Your turn!</p>
//             )}
//           </div>
//         ))}
//       </div>

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={resetGame}
//         className="w-full py-3 rounded-xl font-bold bg-linear-to-r from-gray-600 to-gray-700 text-white flex items-center justify-center gap-2 mt-6"
//       >
//         <RotateCcw className="w-4 h-4" /> Reset Game
//       </motion.button>
//     </div>
//   );
// }
