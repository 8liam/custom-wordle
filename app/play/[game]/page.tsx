"use client";
import { useState } from "react";
import decodeWord from "@/app/utils/decode";
import Navbar from "@/app/components/navbar";
import alphaOnly from "@/app/utils/alphaonly";

function findGame(game: string) {
  const decodedWord = decodeWord(game);
  return decodedWord;
}

export default function Game({ params }: any) {
  const [gameState, setGameState] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [inputValue, setInputValue] = useState("");
  const [row, setRow] = useState(0);
  const [correct, setCorrect] = useState(false);
  const game = findGame(params.game);
  const answer = [game[0], game[1], game[2], game[3], game[4]];
  const [emojiArray, setEmojiArray] = useState<string[][]>([]);
  // Define and initialize the backgroundColors array
  const initialBackgroundColors = Array(6).fill(Array(5).fill(""));
  const [backgroundColors, setBackgroundColors] = useState(
    initialBackgroundColors
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = event.key;

    if (event.ctrlKey) {
      // Handle Ctrl+A and Ctrl+Backspace
      if (keyPressed === "Backspace") {
        // Allow Ctrl+Backspace
        // Handle Backspace key press
        // For now, let's just remove all characters from inputValue
        const newGameState = [...gameState];
        newGameState[row] = ["", "", "", "", ""];
        setGameState(newGameState);
        setInputValue("");
        return;
      }
    }

    if (keyPressed === "Enter") {
      if (gameState[row][4] !== "") {
        const guess = gameState[row];

        const isCorrectGuess = guess.join("") === answer.join("");

        let newGameState = [...gameState];
        let newBackgroundColors = [...backgroundColors];
        let backgroundColorsRow = Array(5).fill(""); // Initialize background colors for the current row

        guess.forEach((letter, index) => {
          if (letter === answer[index]) {
            // Letter found in the exact same position as the answer
            backgroundColorsRow[index] = "bg-green-500";
          } else if (answer.includes(letter)) {
            // Letter found in the answer but not in the same position
            backgroundColorsRow[index] = "bg-yellow-500";
          }
        });

        // Update background colors for the current row
        newBackgroundColors[row] = backgroundColorsRow;

        // Update game state and background colors
        setGameState(newGameState);
        setBackgroundColors(newBackgroundColors);
        if (isCorrectGuess) {
          setCorrect(true);
          const emojiArray = newBackgroundColors.map((row) =>
            row.map((color: string) => {
              if (color === "bg-green-500") return "🟩";
              if (color === "bg-yellow-500") return "🟨";
              return "⬜";
            })
          );
          // Find the index of the first all-green row
          const indexOfAllGreen = emojiArray.findIndex((row) =>
            row.every((cell: string) => cell === "🟩")
          );

          // Remove rows after the first all-green row
          const trimmedEmojiArray =
            indexOfAllGreen === -1
              ? emojiArray
              : emojiArray.slice(0, indexOfAllGreen + 1);

          setEmojiArray(trimmedEmojiArray);
          // 🟨
          // 🟩
          // ⬛
          // You can perform further actions if the guess is correct
        }

        // Move to the next row
        setRow(row + 1);
        setInputValue("");
        return;
      }
      // Evaluate the guess against the answer
    }

    if (keyPressed === "Backspace") {
      if (inputValue.length > 0) {
        const newGameState = [...gameState];
        newGameState[row][inputValue.length - 1] = "";
        setGameState(newGameState);
        setInputValue(inputValue.slice(0, -1));
      }
      return;
    }

    if (!alphaOnly(keyPressed)) {
      event.preventDefault(); // Prevent non-letter inputs
      return;
    }

    if (inputValue.length < 5) {
      const newGameState = [...gameState];
      newGameState[row][inputValue.length] = keyPressed.toUpperCase();
      setGameState(newGameState);
      setInputValue(inputValue + keyPressed.toUpperCase());
    }
  };
  const sendToClipboard = () => {
    // Convert the emojiArray to a formatted string
    const formattedString = emojiArray.map((row) => row.join("")).join("\n");

    // Copy the string to the clipboard
    navigator.clipboard
      .writeText(
        `I got Customdle #${params.game} in ${row} Guesses!\n\n${formattedString}\n\nTry it out: https://customdle.com/play/${params.game}`
      )
      .then(() => {
        alert("Copied to clipboard successfully");
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard");
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {!correct && (
          <>
            <div className="grid grid-cols-5 grid-rows-6 gap-2">
              {gameState.map((row, rowIndex) =>
                row.map((cell, cellIndex) => (
                  <div key={`${rowIndex}-${cellIndex}`} className="relative">
                    {/* Background color */}
                    <div
                      className={`absolute inset-0 opacity-50 ${backgroundColors[rowIndex][cellIndex]}`}
                    />
                    {/* Text content */}
                    <div className="flex border-2 border-gray-500 w-20 h-20 text-center uppercase font-semibold text-5xl items-center justify-center">
                      <p>{cell}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <input
              onKeyDown={handleKeyDown}
              value={inputValue}
              // Update state and convert to uppercase
              type="text"
              className="text-white bg-[#11172a] border-2 border-gray-500 px-1 py-1 text-center uppercase"
              maxLength={5}
            />
          </>
        )}
        {correct && (
          <div>
            <div>
              <h1>Correct in {row} guesses!</h1>
              <a onClick={sendToClipboard}>Share!</a>
            </div>
            <div className="grid grid-cols-5 grid-rows-6 gap-2">
              {gameState.map((row, rowIndex) =>
                row.map((cell, cellIndex) => (
                  <div key={`${rowIndex}-${cellIndex}`} className="relative">
                    {/* Background color */}
                    <div
                      className={`absolute inset-0 opacity-50 ${backgroundColors[rowIndex][cellIndex]}`}
                    />
                    {/* Text content */}
                    <div className="flex border-2 border-gray-500 w-20 h-20 text-center uppercase font-semibold text-5xl items-center justify-center">
                      <p>{cell}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
