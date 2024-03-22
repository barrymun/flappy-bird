import "./App.css";

import { Canvas } from "components";

function App() {
  return (
    <>
      <Canvas />
      <div id="score">0</div>
      <div id="game-over-modal">
        <div className="flex justify-center items-center flex-col w-full h-full">
          <div>Game Over</div>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      </div>
    </>
  );
}

export default App;
