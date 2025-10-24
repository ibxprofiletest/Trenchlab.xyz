import "./App.css";
import LivePage from "./components/LivePage";
import LeaderboardPage from "./components/LeaderboardPage";
import TeamsPage from "./components/TeamsPage";
import AboutPage from "./components/AboutPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LivePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
