import { motion } from "framer-motion";
import Token from "./Token";

export default function GameBoard({ tokens, moveToken, playerColors }) {
  // 15×15 grid = 225 cells (indexes 0–224)
  const gridSize = 15;

  // 🏠 3×3 home zones
  const redHome = [
    0, 1, 2, 3, 4, 5, 15, 16, 17, 18, 19, 20, 30, 31, 32, 33, 34, 35, 45, 46,
    47, 48, 49, 50, 60, 61, 62, 63, 64, 65, 75, 76, 77, 78, 79, 80,
  ];
  const blueHome = [
    9, 10, 11, 12, 13, 14, 24, 25, 26, 27, 28, 29, 39, 40, 41, 42, 43, 44, 54,
    55, 56, 57, 58, 59, 69, 70, 71, 72, 73, 74, 84, 85, 86, 87, 88, 89,
  ];
  const greenHome = [
    135, 136, 137, 138, 139, 140, 150, 151, 152, 153, 154, 155, 165, 166, 167,
    168, 169, 170, 180, 181, 182, 183, 184, 185, 195, 196, 197, 198, 199, 200,
    210, 211, 212, 213, 214, 215,
  ];
  const yellowHome = [
    144, 145, 146, 147, 148, 149, 159, 160, 161, 162, 163, 164, 174, 175, 176,
    177, 178, 179, 189, 190, 191, 192, 193, 194, 204, 205, 206, 207, 208, 209,
    219, 220, 221, 222, 223, 224,
  ];

  // 🎯 Paths (simplified visual layout)
  const redPath = [91, 106, 107, 108, 109, 110, 111];
  const bluePath = [23, 22, 37, 52, 67, 82, 97];
  const greenPath = [201, 202, 187, 172, 157, 142, 127];
  const yellowPath = [133, 118, 117, 116, 115, 114, 113];

  // ⭐ Safe zones
  const safeZones = [36, 102, 188, 122];

  // 🧭 Helper: colorize cells
  const getCellColor = (index) => {
    if (redHome.includes(index)) return "bg-red-500/80";
    if (greenHome.includes(index)) return "bg-green-500/80";
    if (yellowHome.includes(index)) return "bg-yellow-500/80";
    if (blueHome.includes(index)) return "bg-blue-500/80";

    if (redPath.includes(index)) return "bg-red-300/60";
    if (greenPath.includes(index)) return "bg-green-300/60";
    if (yellowPath.includes(index)) return "bg-yellow-300/60";
    if (bluePath.includes(index)) return "bg-blue-300/60";

    if (safeZones.includes(index)) return "bg-white";
    return "bg-amber-800/30";
  };

  // 💫 Center and star visuals
  const getCellContent = (index) => {
    // ⭐ Safe star marker
    if (safeZones.includes(index)) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-yellow-300 rounded-full shadow-inner border border-amber-600" />
        </div>
      );
    }

    // 🎯 Center
    if (index === 112) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-16 h-16">
            {/* 4 triangles */}
            <div className="absolute inset-0 clip-triangle-top bg-red-500"></div>
            <div className="absolute inset-0 clip-triangle-right bg-green-500"></div>
            <div className="absolute inset-0 clip-triangle-bottom bg-yellow-400"></div>
            <div className="absolute inset-0 clip-triangle-left bg-blue-500"></div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative p-6 bg-linear-to-br from-amber-900 to-amber-950 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.6)]">
      <div className="relative grid grid-cols-15 w-[600px] h-[600px] border-8 border-amber-700 rounded-2xl overflow-hidden">
        {[...Array(225)].map((_, index) => (
          <motion.div
            key={index}
            className={`
              relative border border-amber-700/40 flex items-center justify-center 
              ${getCellColor(index)}
              ${safeZones.includes(index) ? "border-2 border-yellow-400" : ""}
              transition-all duration-200
            `}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
          >
            {/* 🧮 Show cell number */}
            <div className="absolute top-0 left-0 text-[8px] text-white/60 p-0.5 select-none">
              {index}
            </div>
            {getCellContent(index)}

            {/* Tokens */}
            {Object.entries(tokens).map(([color, positions]) =>
              positions.map(
                (pos, i) =>
                  pos === index && (
                    <Token
                      key={`${color}-${i}`}
                      color={color}
                      index={i}
                      onClick={() => moveToken(color, i)}
                      playerColors={playerColors}
                    />
                  )
              )
            )}
          </motion.div>
        ))}

        {/* Subtle glowing corners */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-red-500/30 blur-xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/30 blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-yellow-400/30 blur-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-500/30 blur-xl pointer-events-none" />
      </div>
    </div>
  );
}
