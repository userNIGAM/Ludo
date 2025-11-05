const moveToken = (color, index) => {
  if (currentPlayer !== color || winner) return;

  setTokens((prevTokens) => {
    const newPositions = [...prevTokens[color]];
    const currentPos = newPositions[index];

    if (currentPos === -1) {
      if (dice === 6) {
        // Move token from base to starting position
        newPositions[index] = getStartingPosition(color);
      } else {
        // Cannot move tokens from base unless dice is 6
        return prevTokens;
      }
    } else {
      // Move token forward
      const newPos = currentPos + dice;

      if (isInHomePath(color, newPos)) {
        newPositions[index] = newPos;
      } else if (newPos <= 224) {
        newPositions[index] = newPos;
      }

      // Check for capturing opponent tokens
      captureOpponentTokens(color, newPos);
    }

    // Check if the player has won
    if (newPositions.every((pos) => pos >= 1000)) {
      setWinner(color);
    }

    return { ...prevTokens, [color]: newPositions };
  });

  // Switch to the next player if the dice is not 6
  if (dice !== 6) {
    setCurrentPlayer(nextPlayer(currentPlayer));
  }
};
