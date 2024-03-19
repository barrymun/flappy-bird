import { GameEngine } from "core/game-engine";
import { Sprite, SpriteProps } from "core/sprite";

export class Player extends Sprite {
  constructor(props: SpriteProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleUnload = this.handleUnload.bind(this);
    this.bindListeners = this.bindListeners.bind(this);
    this.destroy = this.destroy.bind(this);
    this.bindListeners();
  }

  private handleClick(_event: Event) {
    console.log("click");
  }

  private handleUnload(_event: Event) {
    this.destroy();
  }

  private bindListeners() {
    console.log("bindListeners");
    GameEngine.canvas.addEventListener("click", this.handleClick);
    window.addEventListener("unload", this.handleUnload);
  }

  private destroy() {
    console.log("destroy");
    GameEngine.canvas.removeEventListener("click", this.handleClick);
    window.removeEventListener("unload", this.handleUnload);
  }
}
