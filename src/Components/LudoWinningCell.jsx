import React from "react";

export const LudoWinningCell = ({ direction }) => {
  // direction can be: "up", "down", "left", "right"
  const baseTriangle = "absolute w-0 h-0 border-transparent border-solid";

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Arrow toward center */}
        {direction === "up" && (
          <div
            className={`${baseTriangle} border-l-8 border-r-8 border-b-16 border-b-blue-500`}
          ></div>
        )}
        {direction === "down" && (
          <div
            className={`${baseTriangle} border-l-8 border-r-8 border-t-16 border-t-green-500`}
          ></div>
        )}
        {direction === "left" && (
          <div
            className={`${baseTriangle} border-t-8 border-b-8 border-r-16 border-r-red-500`}
          ></div>
        )}
        {direction === "right" && (
          <div
            className={`${baseTriangle} border-t-8 border-b-8 border-l-16 border-l-yellow-400`}
          ></div>
        )}
      </div>
    </div>
  );
};
