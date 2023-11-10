import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainPage from "./components/MainPage";
import MusicBar from "./components/MusicBar";

function App() {
  return (
    <div className="App">
      <MainPage />
      <MusicBar />
    </div>
  );
}

export default App;
