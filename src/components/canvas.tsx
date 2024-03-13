import { FC, useRef } from "react";

interface CanvasProps {}

const Canvas: FC<CanvasProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return <canvas ref={canvasRef}></canvas>;
};

export { Canvas };
