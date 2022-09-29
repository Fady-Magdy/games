import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import ticTacToeImg from "../../images/tic-tac-toe.png";
import memoryImg from "../../images/memory.png";
const Home = () => {
  document.title = "Games";
  return (
    <div className="home">
      <div className="cards-list">
        <div className="game-card">
          <div className="top">
            <img src={ticTacToeImg} alt="" />
          </div>
          <div className="bottom">
            <h2 className="game-title">Tic Tac Toe</h2>
            <p className="game-description">
              In this game you can play with Robot or Friend, Try it
            </p>
            <Link className="game-btn" to="/TicTacToe">
              Play
            </Link>
          </div>
        </div>
        <div className="game-card">
          <div className="top">
            <img src={memoryImg} alt="" />
          </div>
          <div className="bottom">
            <h2 className="game-title">Memory Game</h2>
            <p className="game-description">
              A simple Memory Card game with multiple Levels
            </p>
            <Link className="game-btn" to="/memory-card">
              Play
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
