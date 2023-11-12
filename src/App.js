import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainPage from "./components/MainPage";
import MusicBar from "./components/MusicBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Artist from "./components/Artist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Artist/:artistId" element={<Artist />} />
      </Routes>
      <MusicBar />
    </BrowserRouter>
  );
}

export default App;
