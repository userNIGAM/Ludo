// Define all player paths
export const paths = {
  red: [
    91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99,
    100, 101, 102, 103, 104, 119, 134, 133, 132, 131, 130, 129, 143, 158, 173,
    188, 203, 218, 217, 216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121,
    120, 105, 106, 107, 108, 109, 110, 111, 112,
  ],
  blue: [
    23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 134, 133, 132, 131,
    130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186, 171, 156, 141,
    125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 81, 66, 51, 36,
    21, 6, 7, 22, 37, 52, 67, 82, 97, 112,
  ],
  yellow: [
    133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186,
    171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95,
    81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103,
    104, 119, 118, 117, 116, 115, 114, 113, 112,
  ],
  green: [
    201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93,
    94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102,
    103, 104, 119, 134, 133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218,
    217, 202, 187, 172, 157, 142, 127, 112,
  ],
};

export const homePositions = {
  red: [31, 34, 46, 49],
  blue: [40, 43, 55, 58],
  green: [166, 169, 181, 184],
  yellow: [175, 178, 190, 193],
};

// 🏁 Final winning positions (the actual home cells)
export const winningPositions = {
  red: [106, 107, 108, 109, 110, 111],
  blue: [22, 37, 52, 67, 82, 97],
  green: [202, 187, 172, 157, 142, 127],
  yellow: [118, 117, 116, 115, 114, 113],
};

// 🛡️ Safe zones where tokens cannot be captured
export const safeZones = [36, 102, 188, 122];

// 🏁 Starting positions for each color
export const startPositions = {
  red: 91,
  blue: 23,
  green: 133,
  yellow: 201,
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

// Order of turns
export const playerOrder = ["red", "blue", "yellow", "green"];

/** 🎯 Capture opponent tokens when landing on their position */
function captureTokens(newTokens, capturingColor, position) {
  // Don't capture in safe zones
  if (isSafeZone(position)) return;

  Object.keys(newTokens).forEach((color) => {
    if (color !== capturingColor) {
      newTokens[color] = newTokens[color].map((tokenPos, tokenIndex) => {
        // If opponent token is at this position, send it home
        if (tokenPos === position) {
          console.log(`🎯 Captured ${color} token at position ${position}`);
          return homePositions[color][tokenIndex]; // Send to corresponding home position
        }
        return tokenPos;
      });
    }
  });
}

/** 🛡️ Check if position is a safe zone */
export function isSafeZone(position) {
  return safeZones.includes(position);
}

/** 🎲 Roll a random dice (1–6) */
export function rollDiceValue() {
  return Math.floor(Math.random() * 6) + 1;
}

/** 🔄 Get the next player in sequence */
export function nextPlayer(current) {
  const index = playerOrder.indexOf(current);
  return playerOrder[(index + 1) % playerOrder.length];
}

/** 🎯 Check if token can enter home column with exact dice roll */
export function canEnterHome(tokens, color, tokenIndex, dice) {
  const path = paths[color];
  const home = homePositions[color];
  const currentPos = tokens[color][tokenIndex];

  // If token is already in home, no movement needed
  if (home.includes(currentPos)) {
    return false;
  }

  // Find current position in path
  const currentIndex = path.indexOf(currentPos);
  if (currentIndex === -1) return false;

  // Check if exact dice roll would land token exactly at the path end
  const stepsToEnd = path.length - currentIndex - 1;
  return dice === stepsToEnd;
}

/** 🏠 Move token to home position if exact dice roll */
export function moveToHomePosition(tokens, color, tokenIndex, dice) {
  const newTokens = {
    red: [...tokens.red],
    blue: [...tokens.blue],
    yellow: [...tokens.yellow],
    green: [...tokens.green],
  };

  const path = paths[color];
  const home = homePositions[color];
  const currentPos = newTokens[color][tokenIndex];

  // If token can enter home with exact dice
  if (canEnterHome(tokens, color, tokenIndex, dice)) {
    // Find which home position is available (not occupied by another token of same color)
    const availableHomeIndex = home.findIndex((homePos, index) => {
      return !newTokens[color].includes(homePos) || homePos === currentPos;
    });

    if (availableHomeIndex !== -1) {
      const oldPosition = newTokens[color][tokenIndex];
      newTokens[color][tokenIndex] = home[availableHomeIndex];
      console.log(
        `🏠 ${color} token entered home from ${oldPosition} to position ${home[availableHomeIndex]}`
      );
    }
  }

  return newTokens;
}

/** ✅ Check if a player has any valid move for a given dice roll */
export function hasValidMove(tokens, color, dice) {
  const path = paths[color];
  const currentTokens = tokens[color];
  const home = homePositions[color];
  // const lastCell = path[path.length - 1];

  return currentTokens.some((pos, index) => {
    // Token is already in final home position - cannot move
    // if (home.includes(pos) && pos !== lastCell) {
    //   return false;
    // }

    // Token is in home - can only move on 6
    if (home.includes(pos)) {
      return dice === 6;
    }

    // Token can enter home with exact dice roll
    if (canEnterHome(tokens, color, index, dice)) {
      return true;
    }

    // Token is on the path - can move if within path bounds
    const currentIndex = path.indexOf(pos);
    if (currentIndex !== -1) {
      return currentIndex + dice < path.length;
    }

    return false;
  });
}

/** 🧭 Compute new token positions after a move */
export function moveTokenPosition(tokens, color, index, dice) {
  // Deep clone the tokens
  const newTokens = {
    red: [...tokens.red],
    blue: [...tokens.blue],
    yellow: [...tokens.yellow],
    green: [...tokens.green],
  };

  const path = paths[color];
  const home = homePositions[color];
  const currentPos = newTokens[color][index];
  const start = path[0];
  // const lastCell = path[path.length - 1];

  // // Don't move tokens that are already in home positions
  // if (home.includes(currentPos) && currentPos !== lastCell) {
  //   console.log(`Token already in home position: ${currentPos}`);
  //   return newTokens;
  // }

  // From home → onto start (only on 6)
  if (home.includes(currentPos)) {
    if (dice === 6) {
      const oldPosition = newTokens[color][index];
      newTokens[color][index] = start;
      console.log(
        `🚀 Moved ${color} token from home ${oldPosition} to start position: ${start}`
      );
      // Check for captures when moving to start
      captureTokens(newTokens, color, start);
    } else {
      console.log(`🎲 ${color} token in home needs 6 to move, but got ${dice}`);
    }
    return newTokens;
  }

  // Check if token can enter home with exact dice
  if (canEnterHome(tokens, color, index, dice)) {
    console.log(`🎯 ${color} token can enter home with exact dice ${dice}`);
    return moveToHomePosition(tokens, color, index, dice);
  }

  // Move along the path (normal movement)
  const currentIndex = path.indexOf(currentPos);
  if (currentIndex === -1) {
    console.error(
      `❌ Token not found on path: ${color} token at position ${currentPos}`
    );
    return newTokens;
  }

  const nextIndex = currentIndex + dice;
  if (nextIndex < path.length) {
    const newPosition = path[nextIndex];
    const oldPosition = newTokens[color][index];
    newTokens[color][index] = newPosition;
    console.log(
      `➡️ Moved ${color} token from ${oldPosition} to ${newPosition}`
    );

    // Check for captures after movement (only if not in safe zone)
    captureTokens(newTokens, color, newPosition);
  } else {
    console.log(
      `⛔ Cannot move ${color} token - would exceed path length (dice: ${dice}, currentIndex: ${currentIndex}, pathLength: ${path.length})`
    );
  }

  return newTokens;
}

/** 🏁 Check if player has won by getting all tokens to home */
export function checkWinner(tokens, color) {
  const home = homePositions[color];

  // Check if all tokens are in their home positions
  const allInHome = tokens[color].every((tokenPos, index) => {
    return tokenPos === home[index];
  });

  if (allInHome) {
    console.log(`🎉 ${color} player wins! All tokens in home positions`);
    return true;
  }

  return false;
}

/** 🎯 Get active players (who haven't won yet) */
export function getActivePlayers(tokens) {
  return playerOrder.filter((color) => !checkWinner(tokens, color));
}

/** 🐛 Debug helper to check token states */
export function debugTokens(tokens, color) {
  const path = paths[color];
  const home = homePositions[color];

  console.log(`=== Debug ${color} tokens ===`);
  tokens[color].forEach((pos, index) => {
    const inHome = home.includes(pos);
    const onPath = path.includes(pos);
    const pathIndex = path.indexOf(pos);
    const atEnd = pos === path[path.length - 1];
    const inSafeZone = isSafeZone(pos);

    console.log(
      `Token ${index}: position ${pos}, home: ${inHome}, path: ${onPath}, pathIndex: ${pathIndex}, atEnd: ${atEnd}, safe: ${inSafeZone}`
    );
  });
}

/** 🐛 Debug token positions and winner status */
export function debugWinnerStatus(tokens) {
  console.log("=== Winner Status Check ===");
  playerOrder.forEach((color) => {
    const won = checkWinner(tokens, color);
    console.log(
      `${color}: ${won ? "WINNER!" : "Playing"} - Tokens: [${tokens[color].join(
        ", "
      )}]`
    );
  });
}

/** 🔍 Check if position is occupied by another token */
export function isPositionOccupied(tokens, color, position, currentTokenIndex) {
  // Check same color tokens (except current one)
  if (
    tokens[color].some(
      (pos, index) => index !== currentTokenIndex && pos === position
    )
  ) {
    return true;
  }

  // Check other colors
  return Object.keys(tokens).some((otherColor) => {
    if (otherColor === color) return false;
    return tokens[otherColor].some((pos) => pos === position);
  });
}
