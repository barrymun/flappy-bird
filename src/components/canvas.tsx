import { FC, useEffect, useRef } from "react";

import { GameEngine } from "core";

interface CanvasProps {}

const Canvas: FC<CanvasProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) {
      return;
    }
    new GameEngine(canvas);
  }, [canvasRef]);

  return <canvas ref={canvasRef}></canvas>;
};

export { Canvas };
