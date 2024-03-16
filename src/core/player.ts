import { Sprite, SpriteProps } from "core/sprite";

export class Player extends Sprite {
  constructor(props: SpriteProps) {
    super(props);
  }

  // private handleKeyDown = (_event: Event) => {
  // };

  // private handleKeyUp = (_event: Event) => {
  // };

  // private handleUnload = (_event: Event) => {
  //   this.destroy();
  // };

  // private bindListeners = () => {
  //   window.addEventListener("keydown", this.handleKeyDown);
  //   window.addEventListener("keyup", this.handleKeyUp);
  //   window.addEventListener("unload", this.handleUnload);
  // };

  // private destroy = () => {
  //   window.removeEventListener("keydown", this.handleKeyDown);
  //   window.removeEventListener("keyup", this.handleKeyUp);
  //   window.removeEventListener("unload", this.handleUnload);
  // };
}
