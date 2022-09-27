import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./ticTacToe.scss";
const TicTacToe = () => {
  const [currentPlayer, setCurrentPlayer] = useState("o");
  const [preventPlay, setPreventPlay] = useState(false);
  const [robotMode, setRobotMode] = useState(true);
  const yourScore = useRef(0);
  const robotScore = useRef(0);
  const gameOver = useRef(false);
  const winner = useRef("");
  const playedTurns = useRef(0);
  const clickedX = useRef([]);
  const clickedO = useRef([]);
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

  useEffect(() => {
    if (currentPlayer === "o") {
      robotPlay();
      return;
    }
  }, []);

  function play(e) {
    if (!e.target.value) {
      let currentTurn = currentPlayer;
      e.target.innerText = currentTurn;
      e.target.value = true;
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
        clickedO.current.push(random + 1);
        setCurrentPlayer("x");
        playedTurns.current += 1;
        checkWinner();
      }, 1300);
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
        if (robotMode) yourScore.current += 1;
      }
      if (
        clickedO.current.includes(row[0]) &&
        clickedO.current.includes(row[1]) &&
        clickedO.current.includes(row[2])
      ) {
        gameOver.current = true;
        winner.current = "o";
        setPreventPlay(true);
        if (robotMode) robotScore.current += 1;
      }
    });
    if (playedTurns.current === 9 && winner.current.length < 1)
      gameOver.current = true;
  }

  function replay() {
    gameOver.current = false;
    winner.current === "x" ? setCurrentPlayer("o") : setCurrentPlayer("x");
    winner.current = "";
    clickedX.current = [];
    clickedO.current = [];
    playedTurns.current = 0;
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.innerText = "";
      square.value = false;
    });
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
          onClick={() => {
            setRobotMode(false);
            replay();
          }}
          className="btn players"
        >
          Play With Friend
        </button>
        <button
          onClick={() => {
            setRobotMode(true);
            replay();
          }}
          className="btn robot-btn"
        >
          Play With Robot
        </button>
      </div>
      <div className="game-container">
        <div className="status">
          <div className="score left-score">You: {yourScore.current}</div>
          <div className="turn">
            {!gameOver.current
              ? robotMode
                ? currentPlayer === "x"
                  ? "Your Turn"
                  : "Robot's Turn"
                : `${currentPlayer.toUpperCase()}'s Turn`
              : "Game Over"}
          </div>
          <div className="score left-score">Robot: {robotScore.current}</div>
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
