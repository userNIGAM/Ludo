// utils/gameLogic.js

// 🎯 Define all player paths
export const paths = {
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
    201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93,
    94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102,
    103, 104, 119, 134, 133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218,
    217, 202, 187, 172, 157, 142, 127,
  ],
};

export const homePositions = {
  red: [32, 33, 47, 48],
  blue: [41, 42, 56, 57],
  yellow: [167, 168, 182, 183],
  green: [176, 177, 191, 192],
};

// 🎨 Player colors (for styling)
export const playerColors = {
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

// 🧭 Order of turns
export const playerOrder = ["red", "blue", "yellow", "green"];

/** 🎲 Roll a random dice (1–6) */
export function rollDiceValue() {
  return Math.floor(Math.random() * 6) + 1;
}

/** 🔄 Get the next player in sequence */
export function nextPlayer(current) {
  const index = playerOrder.indexOf(current);
  return playerOrder[(index + 1) % playerOrder.length];
}

/** ✅ Check if a player has any valid move for a given dice roll */
export function hasValidMove(tokens, color, dice) {
  const path = paths[color];
  const currentTokens = tokens[color];
  const home = homePositions[color];

  return currentTokens.some((pos) => {
    if (home.includes(pos)) {
      return dice === 6; // can leave home only on 6
    }
    const currentIndex = path.indexOf(pos);
    return currentIndex !== -1 && currentIndex + dice < path.length;
  });
}

/** 🧩 Compute new token positions after a move */
export function moveTokenPosition(tokens, color, index, dice) {
  const newTokens = { ...tokens };
  const path = paths[color];
  const home = homePositions[color];
  const currentPos = newTokens[color][index];
  const start = path[0];

  // From home → onto start
  if (home.includes(currentPos)) {
    if (dice === 6) {
      newTokens[color][index] = start;
    }
    return newTokens;
  }

  // Move along the path
  const currentIndex = path.indexOf(currentPos);
  if (currentIndex === -1) return newTokens;

  const nextIndex = currentIndex + dice;
  if (nextIndex < path.length) {
    newTokens[color][index] = path[nextIndex];
  }

  return newTokens;
}

/** 🏁 Check if player has reached home with all tokens */
export function checkWinner(tokens, color) {
  const path = paths[color];
  const lastCell = path[path.length - 1];
  return tokens[color].every((pos) => pos === lastCell);
}
