export interface Coords {
  x: number;
  y: number;
}
export type SpriteAnimation = "idle";
export type SpriteImageAttribute = {
  [key in SpriteAnimation]: {
    imageSrc: string;
    flippedImageSrc?: string;
    totalFrames?: number;
  };
};
export type SpriteImageElement = {
  [key in SpriteAnimation]: {
    image: HTMLImageElement;
    flippedImage?: HTMLImageElement;
    totalFrames: number;
  };
};
export interface PipeData {
  pipeHeight: number;
  pipeGap: number;
  pipeWidth: number;
  min: number;
  max: number;
}
