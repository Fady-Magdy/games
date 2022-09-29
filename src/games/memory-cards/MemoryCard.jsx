import React, { useRef, useState } from "react";
import questionMarkImg from "./images/question-mark.png";
import "./memorycard.scss";
import { useEffect } from "react";
import cardsData from "./cardsData";

const MemoryCard = () => {
  const [level, setLevel] = useState(1);
  const [allCards, setAllCards] = useState([]);
  const [coverGame, setCoverGame] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [trueCards, setTrueCards] = useState(0);
  const [clicks, setClicks] = useState(0);
  const flippedCards = useRef(0);
  const flippedCard1 = useRef(0);
  const flippedCard2 = useRef(0);
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  useEffect(() => {
    if (trueCards === cardsData[level - 1].length) {
      if (level < cardsData.length) {
        setCoverGame(true);
        setTimeout(() => {
          setLevel((prev) => prev + 1);
          setTrueCards(0);
          refreshCards();
          setCoverGame(false);
        }, 1200);
      } else {
        setTimeout(() => {
          setGameComplete(true);
          console.log("You Completed The Game");
        }, 600);
      }
    }
  }, [trueCards]);

  useEffect(() => {
    refreshCards();
  }, [level]);

  const refreshCards = () => {
    setAllCards(() =>
      cardsData[level - 1].map((card) => {
        return getCard(card);
      })
    );
    setAllCards((prev) => [
      ...prev,
      ...cardsData[level - 1].map((card) => {
        return getCard(card);
      }),
    ]);
    setAllCards((prev) => prev.sort((a, b) => 0.5 - Math.random()));
  };
  const rotateImg = (e) => {
    if (
      flippedCards.current < 2 &&
      e.currentTarget.value !== "used" &&
      e.currentTarget.value !== "done"
    ) {
      console.log();
      e.currentTarget.value = "used";
      flippedCards.current += 1;
      let target = e.currentTarget;
      target.classList.add("flip");
      if (flippedCards.current === 1) {
        flippedCard1.current = target.getAttribute("data-num");
        cardRef1.current = target;
      }
      if (flippedCards.current === 2) {
        flippedCard2.current = target.getAttribute("data-num");
        cardRef2.current = target;
        if (flippedCard1.current === flippedCard2.current) {
          setTrueCards((prev) => prev + 1);
          setScore((prev) => prev + 1);
          cardRef1.current.value = "done";
          cardRef2.current.value = "done";
        } else {
          setTimeout(() => {
            cardRef1.current.value = "";
            cardRef2.current.value = "";
            cardRef1.current.classList.remove("flip");
            cardRef2.current.classList.remove("flip");
          }, 1000);
        }
        setTimeout(() => {
          flippedCards.current = 0;
        }, 1000);
      }
      setClicks((prev) => prev + 1);
    }
  };
  const getCard = (card) => {
    return (
      <div
        key={Math.random()}
        data-num={card.num}
        onClick={rotateImg}
        className="card"
      >
        <div className="image front">
          <img src={questionMarkImg} alt="" />
        </div>
        <div className="image back">
          <img src={card.img} alt="" />
        </div>
      </div>
    );
  };

  return (
    <div className="memory-card">
      <h1 className="game-title">Memory Card</h1>
      <div className="details">
        <p className="score">Level: {level}</p>
        <p className="score">Score: {score}</p>
        <p className="true-answers">Clicks: {clicks}</p>
      </div>
      <div className={`completed-msg ${gameComplete ? "complete" : ""}`}>
        <h2>Good Work</h2>
        <h3>You Completed The Game</h3>
        <button
          onClick={() => {
            setLevel(1);
            setTrueCards(0);
            refreshCards();
            setGameComplete(false);
          }}
        >
          Play Again
        </button>
      </div>
      <div className={`cards ${gameComplete ? "complete" : ""}`}>
        {allCards}
        {coverGame && <div className="cover-game">Level {level} Complete</div>}
      </div>
    </div>
  );
};

export default MemoryCard;
