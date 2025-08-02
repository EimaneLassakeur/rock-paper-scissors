import { useEffect,useState } from "react";
import "./index.css";

import rockImg from "./assets/rock.png";
import paperImg from "./assets/paper.png";
import scissorsImg from "./assets/scissors.png";

const images = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
};


const App = () => {

  const [userChoice, setUserChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerChoice, setComputerChoice] = useState(null);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState("");

  const choices = ["rock", "paper", "scissors"];

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  const determineWinner = (user, computer) => {
    if (user === computer) return "draw";

    if (
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock") ||
      (user === "scissors" && computer === "paper")
    ) {
      return "user";
    }

    return "computer";
  };

  const handlePlay = (userSelected) => {
    const computerSelected = getComputerChoice();

    setUserChoice(userSelected);
    setComputerChoice(computerSelected);

    const winner = determineWinner(userSelected, computerSelected);

    if (winner === "user") {
      setUserScore((prev) => prev + 1);
      setResult("Won");
    } else if (winner === "computer") {
      setComputerScore((prev) => prev + 1);
      setResult("Lost");
    } else if (winner === "draw") {
      setResult("Draw");
    }
  }

  const resetGame = () => {
    setUserChoice(null);
    setUserScore(0);
    setComputerChoice(null);
    setComputerScore(0);
    setResult("");
  }

  return (
    <div className="app">
      <h1>Rock Paper Scissors</h1>
      <div className="result">
        <p>{result}</p>
        <p className="user-result">User :{userScore}</p>
        <p className="computer-result">Computer :{computerScore}</p>
      </div>
      <div className="display">
        <div className="choice-display">
          <p>User</p>
          {userChoice && (
            <img
              key={userChoice}
              src={images[userChoice]}
              alt={userChoice}
              className="choice-image animate"
            />
          )}
        </div>
        <div className="choice-display">
          <p>Computer</p>
          {computerChoice && (
            <img
              key={computerChoice}
              src={images[computerChoice]}
              alt={computerChoice}  
              className="choice-image animate"
            />
          )}
        </div>
      </div>

      <div className="buttons">
        {choices.map((choice) => (
          <button
            key={choice}
            className="choice"
            onClick={() => handlePlay(choice)}
          >
            {choice}
          </button>
        ))}
        <button className="reset" onClick={() => {resetGame()}}>Reset</button>
      </div>
    </div>
  );
};

export default App;
