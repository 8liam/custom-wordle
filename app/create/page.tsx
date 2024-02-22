"use client";
import { useState } from "react";
import encodeWord from "@/app/utils/encode";
import { useWordChecker } from "react-word-checker";
import Navbar from "@/app/components/navbar";
import alphaOnlyCreate from "@/app/utils/alphaonlycreate";

export default function CreateGame() {
  const { words, isLoading, wordExists } = useWordChecker("en");
  const [error, setError] = useState("");
  const [word, setWord] = useState("");
  const [link, setLink] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    if (wordExists(word)) {
      if (word.length < 5) {
        setError(`${word} is not 5 letters.`);
        return;
      }
      const encodedWord = encodeWord(word); // Assuming encodeWord returns an encoded string
      setLink(`/play/${encodedWord}`);
      setError("");
    }
    if (!wordExists(word)) {
      setError(`${word} is not a word.`);
    }
  };

  const copyLink = async () => {
    // Use window.location.origin to get the base URL, then append the relative link
    const absoluteUrl = `${window.location.origin}${link}`;
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      alert("Link copied to clipboard!"); // Provide feedback to the user
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex ">
        <div className="mx-auto my-40 space-y-4">
          <h1 className="font-semibold">Choose a 5 letter word to play</h1>
          <form onSubmit={handleSubmit}>
            <input
              onKeyDown={alphaOnlyCreate}
              onChange={(e) => setWord(e.target.value.toUpperCase())} // Update state and convert to uppercase
              type="text"
              value={word}
              className="text-white bg-[#11172a] border-2 border-gray-500 px-1 py-1 text-center uppercase"
              maxLength={5}
            />
            <button type="submit" className="mx-5 bg-black p-2 rounded">
              Create
            </button>
          </form>
          {link && (
            <div className="grid grid-cols-2">
              <div>
                <a href={link} className="bg-close p-2 rounded">
                  Go to Game
                </a>
              </div>
              <div>
                <a onClick={copyLink} className="bg-correct p-2 rounded">
                  Share Link
                </a>
              </div>
            </div>
          )}
          {error && (
            <div>
              <h1>{error}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
