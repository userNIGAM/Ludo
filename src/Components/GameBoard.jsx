import { motion } from "framer-motion";
import Token from "./Token";

export default function GameBoard({ tokens, moveToken, playerColors }) {
  // Define home bases for each color (3x3 areas in corners)
  const redHome = [0, 1, 2, 15, 16, 17, 30, 31, 32];
  const greenHome = [12, 13, 14, 27, 28, 29, 42, 43, 44];
  const yellowHome = [180, 181, 182, 195, 196, 197, 210, 211, 212];
  const blueHome = [192, 193, 194, 207, 208, 209, 222, 223, 224];

  // Define starting positions (just outside home bases)
  const redStart = [33, 48, 63, 78];
  const greenStart = [59, 74, 89, 104];
  const yellowStart = [171, 156, 141, 126];
  const blueStart = [145, 130, 115, 100];

  // Define main paths (colored paths leading to center)
  const redPath = [3, 4, 5, 6, 7, 8, 23, 38, 53, 68, 83, 98, 113];
  const greenPath = [9, 10, 11, 26, 41, 56, 71, 86, 101, 116, 117, 118, 119];
  const yellowPath = [
    213, 214, 215, 200, 185, 170, 155, 140, 125, 110, 95, 80, 65,
  ];
  const bluePath = [
    219, 218, 217, 202, 187, 172, 157, 142, 127, 112, 97, 82, 67,
  ];

  // Define safe zones (star positions)
  const safeZones = [
    20, 25, 45, 50, 70, 75, 95, 100, 120, 125, 145, 150, 170, 175, 195, 200,
  ];

  // Define center home columns
  const redHomeColumn = [128, 143, 158, 173, 188];
  const greenHomeColumn = [134, 149, 164, 179, 194];
  const yellowHomeColumn = [106, 91, 76, 61, 46];
  const blueHomeColumn = [100, 85, 70, 55, 40];

  const getCellColor = (index) => {
    if (redHome.includes(index)) return "bg-red-500";
    if (greenHome.includes(index)) return "bg-green-500";
    if (yellowHome.includes(index)) return "bg-yellow-500";
    if (blueHome.includes(index)) return "bg-blue-500";

    if (redPath.includes(index)) return "bg-red-300";
    if (greenPath.includes(index)) return "bg-green-300";
    if (yellowPath.includes(index)) return "bg-yellow-300";
    if (bluePath.includes(index)) return "bg-blue-300";

    if (safeZones.includes(index)) return "bg-white";
    if (
      redHomeColumn.includes(index) ||
      greenHomeColumn.includes(index) ||
      yellowHomeColumn.includes(index) ||
      blueHomeColumn.includes(index)
    ) {
      return "bg-gray-200";
    }

    return "bg-gray-100";
  };

  const getCellContent = (index) => {
    if (safeZones.includes(index)) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm" />
        </div>
      );
    }

    // Center star
    if (index === 112) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative p-8 bg-gradient-to-br from-amber-800 to-amber-900 rounded-3xl shadow-2xl">
      <div className="relative grid grid-cols-15 w-[600px] h-[600px] border-4 border-amber-600 rounded-xl overflow-hidden bg-amber-700">
        {[...Array(225)].map((_, index) => (
          <motion.div
            key={index}
            className={`
              border border-amber-600/30 relative flex items-center justify-center
              ${getCellColor(index)}
              ${safeZones.includes(index) ? "border-2 border-yellow-400" : ""}
              transition-colors duration-200
            `}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {getCellContent(index)}

            {/* Render tokens */}
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

        {/* Decorative corners */}
        <div className="absolute top-2 left-2 w-20 h-20 bg-red-500 rounded-lg opacity-20" />
        <div className="absolute top-2 right-2 w-20 h-20 bg-green-500 rounded-lg opacity-20" />
        <div className="absolute bottom-2 left-2 w-20 h-20 bg-yellow-500 rounded-lg opacity-20" />
        <div className="absolute bottom-2 right-2 w-20 h-20 bg-blue-500 rounded-lg opacity-20" />
      </div>
    </div>
  );
}
