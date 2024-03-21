import "./App.css";

import { Canvas } from "components";

function App() {
  return (
    <>
      <Canvas />
      <div id="score">0</div>
      <div id="game-over-modal">
        <div className="game-over-modal-content">
          <div>Game Over</div>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      </div>
    </>
  );
}

export default App;
