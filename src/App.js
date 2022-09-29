import TicTacToe from "./games/TicTacToe/TicTacToe";
import MemoryCard from "./games/memory-cards/MemoryCard.jsx";
import Home from "./pages/home/Home.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/app.scss";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/games">
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/TicTacToe" element={<TicTacToe />} />
          <Route path="//memory-card" element={<MemoryCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
