import React, { useState, useRef, useEffect } from "react";
import robotImg from "./images/robot.jpg";
import catImg from "./images/cat.jpg";
import cat2Img from "./images/cat2.jpg";
import "./ticTacToe.scss";

const TicTacToe = () => {
  document.title = "Games - Tic Tac Toe";
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [preventPlay, setPreventPlay] = useState(false);
  const [robotMode, setRobotMode] = useState(true);
  const yourScore = useRef(
    localStorage.getItem("TicTacToeYourScore") !== null
      ? JSON.parse(localStorage.getItem("TicTacToeYourScore"))
      : 0
  );
  const robotScore = useRef(
    localStorage.getItem("TicTacToeRobotScore") !== null
      ? JSON.parse(localStorage.getItem("TicTacToeRobotScore"))
      : 0
  );
  const xScore = useRef(
    localStorage.getItem("TicTacToeXScore") !== null
      ? JSON.parse(localStorage.getItem("TicTacToeXScore"))
      : 0
  );
  const oScore = useRef(
    localStorage.getItem("TicTacToeOScore") !== null
      ? JSON.parse(localStorage.getItem("TicTacToeOScore"))
      : 0
  );
  const gameOver = useRef(false);
  const winner = useRef("");
  const playedTurns = useRef(0);
  const clickedX = useRef([]);
  const clickedO = useRef([]);
  const winPathRef = useRef(null);
  const winWays = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  useEffect(() => {}, [currentPlayer]);
  let winway;
  const checkWinPath = () => {
    switch (winway) {
      case "123":
        winPathRef.current.style.rotate = "0deg";
        winPathRef.current.style.left = "50%";
        winPathRef.current.style.top = "17%";
        winPathRef.current.style.width = "220px";
        break;
      case "456":
        winPathRef.current.style.rotate = "0deg";
        winPathRef.current.style.left = "50%";
        winPathRef.current.style.top = "50%";
        winPathRef.current.style.width = "220px";
        break;
      case "789":
        winPathRef.current.style.rotate = "0deg";
        winPathRef.current.style.left = "50%";
        winPathRef.current.style.top = "86%";
        winPathRef.current.style.width = "220px";
        break;
      case "147":
        winPathRef.current.style.rotate = "90deg";
        winPathRef.current.style.top = "50%";
        winPathRef.current.style.left = "16%";
        winPathRef.current.style.width = "220px";
        break;
      case "258":
        winPathRef.current.style.rotate = "90deg";
        winPathRef.current.style.top = "50%";
        winPathRef.current.style.left = "50%";
        winPathRef.current.style.width = "220px";
        break;
      case "369":
        winPathRef.current.style.rotate = "90deg";
        winPathRef.current.style.top = "50%";
        winPathRef.current.style.left = "84%";
        winPathRef.current.style.width = "220px";
        break;
      case "159":
        winPathRef.current.style.rotate = "45deg";
        winPathRef.current.style.top = "50%";
        winPathRef.current.style.left = "50%";
        winPathRef.current.style.width = "300px";
        break;
      case "357":
        winPathRef.current.style.rotate = "-45deg";
        winPathRef.current.style.top = "50%";
        winPathRef.current.style.left = "50%";
        winPathRef.current.style.width = "300px";
        break;
      default:
        return;
    }
  };
  function playWithFriend() {
    setCurrentPlayer("x");
    setRobotMode(false);
    gameOver.current = false;
    winner.current = "";
    clickedX.current = [];
    clickedO.current = [];
    playedTurns.current = 0;
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.innerText = "";
      square.value = false;
      square.classList.remove("used");
    });
    setPreventPlay(false);
  }
  function play(e) {
    if (!e.target.value) {
      let currentTurn = currentPlayer;
      e.target.innerText = currentTurn;
      e.target.value = true;
      e.target.classList.add("used");
      if (robotMode && !gameOver.current) {
        setCurrentPlayer("o");
        clickedX.current.push(+e.target.getAttribute("data-num"));
      } else {
        if (currentPlayer === "x") {
          setCurrentPlayer("o");
          clickedX.current.push(+e.target.getAttribute("data-num"));
        } else {
          setCurrentPlayer("x");
          clickedO.current.push(+e.target.getAttribute("data-num"));
        }
      }
      playedTurns.current += 1;
      checkWinner();
      if (robotMode) robotPlay();
    }
  }

  function getRandomNum() {
    let random = Math.floor(Math.random() * 9);
    return random;
  }

  function robotPlay() {
    setTimeout(() => {
      setPreventPlay(true);
    }, 0);
    if (!gameOver.current && playedTurns.current < 9) {
      let squares = document.querySelectorAll(".square");
      let random = getRandomNum();
      if (squares[random].value) {
        robotPlay();
        return;
      }
      setTimeout(() => {
        setPreventPlay(false);
        squares[random].innerText = "o";
        squares[random].value = true;
        squares[random].classList.add("used");
        clickedO.current.push(random + 1);
        setCurrentPlayer("x");
        playedTurns.current += 1;
        checkWinner();
      }, 400);
    }
  }

  function checkWinner() {
    winWays.forEach((row) => {
      if (
        clickedX.current.includes(row[0]) &&
        clickedX.current.includes(row[1]) &&
        clickedX.current.includes(row[2])
      ) {
        gameOver.current = true;
        winner.current = "x";
        setPreventPlay(true);
        winway = row[0].toString() + row[1].toString() + row[2].toString();
        if (robotMode) {
          yourScore.current += 1;
          localStorage.setItem(
            "TicTacToeYourScore",
            JSON.stringify(yourScore.current)
          );
        } else {
          xScore.current += 1;
          localStorage.setItem(
            "TicTacToeXScore",
            JSON.stringify(xScore.current)
          );
        }
      }
      if (
        clickedO.current.includes(row[0]) &&
        clickedO.current.includes(row[1]) &&
        clickedO.current.includes(row[2])
      ) {
        gameOver.current = true;
        winner.current = "o";
        setPreventPlay(true);
        winway = row[0].toString() + row[1].toString() + row[2].toString();
        if (robotMode) {
          robotScore.current += 1;
          localStorage.setItem(
            "TicTacToeRobotScore",
            JSON.stringify(robotScore.current)
          );
        } else {
          oScore.current += 1;
          localStorage.setItem(
            "TicTacToeOScore",
            JSON.stringify(oScore.current)
          );
        }
      }
    });
    if (robotMode && winner.current === "o") {
      winPathRef.current.style.backgroundColor = "#f00";
    } else {
      winPathRef.current.style.backgroundColor = "rgb(0, 230, 15)";
    }
    checkWinPath();
    if (playedTurns.current === 9 && winner.current.length < 1)
      gameOver.current = true;
  }

  function replay() {
    gameOver.current = false;
    winner.current === "x" ? setCurrentPlayer("o") : setCurrentPlayer("x");
    if (winner.current === "") {
      setCurrentPlayer("x");
      setPreventPlay(false);
    }
    winner.current = "";
    clickedX.current = [];
    clickedO.current = [];
    playedTurns.current = 0;
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.innerText = "";
      square.value = false;
      square.classList.remove("used");
    });
    if (!robotMode) setCurrentPlayer("x");
    if (robotMode && currentPlayer === "o") {
      robotPlay();
    }

    setPreventPlay(false);
  }
  return (
    <div className="tic-tac-toe">
      <div className="title"> Tic Tac Toe</div>
      <div className="top">
        <button
          onClick={playWithFriend}
          className={`btn  ${!robotMode ? "robot-mode" : ""}`}
        >
          Play With Friend
        </button>
        <button
          onClick={() => {
            winner.current = "";
            setRobotMode(true);
            replay();
          }}
          className={`btn ${robotMode ? "robot-mode" : ""}`}
        >
          Play With Robot
        </button>
      </div>
      <div className="game-container">
        <div className="status">
          <div className="score left-score">
            <div className="image">
              <img src={catImg} alt="" />
            </div>
            {robotMode ? `You: ${yourScore.current}` : `X: ${xScore.current}`}
          </div>
          <div className="turn">
            {!gameOver.current
              ? robotMode
                ? currentPlayer === "x"
                  ? "Your Turn"
                  : "Robot's Turn"
                : `${currentPlayer.toUpperCase()}'s Turn`
              : "Game Over"}
          </div>
          <div className="score left-score">
            <div className="image">
              <img src={robotMode ? robotImg : cat2Img} alt="" />
            </div>
            {robotMode
              ? `Robot: ${robotScore.current}`
              : `O: ${oScore.current}`}
          </div>
        </div>
        <div className="tic-tac">
          <div data-num="1" onClick={play} className="square"></div>
          <div data-num="2" onClick={play} className="square"></div>
          <div data-num="3" onClick={play} className="square"></div>
          <div data-num="4" onClick={play} className="square"></div>
          <div data-num="5" onClick={play} className="square"></div>
          <div data-num="6" onClick={play} className="square"></div>
          <div data-num="7" onClick={play} className="square"></div>
          <div data-num="8" onClick={play} className="square"></div>
          <div data-num="9" onClick={play} className="square"></div>
          {preventPlay && <div className="game-over-background"></div>}
          {
            <div
              ref={winPathRef}
              className={`win-path ${
                gameOver.current && winner.current.length > 0 ? "show" : ""
              }`}
            ></div>
          }
        </div>
        <div className="game-over">
          {gameOver.current
            ? playedTurns.current > 8 && winner.current.length < 1
              ? "No One Wins"
              : robotMode
              ? winner.current === "x"
                ? "You Win"
                : " Robot Win"
              : `"${winner.current.toUpperCase()}" Wins`
            : ""}
        </div>
        {gameOver.current && (
          <button className="btn replay" onClick={replay}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
