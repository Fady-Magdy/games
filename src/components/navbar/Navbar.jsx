import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="brand">
        <Link to="/">Games</Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/TicTacToe">Tic Tac Toe</Link>
        </li>
        <li>
          <Link to="/memory-card">Memory Card</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
