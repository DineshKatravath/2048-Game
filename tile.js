export default class Tile {
  #x;
  #y;
  #tileElement;
  #value;

  constructor(tileContainer, value = Math.random() > 0.75 ? 4 : 2) {
    this.#tileElement = document.createElement("div");
    this.#tileElement.classList.add("tile");
    tileContainer.append(this.#tileElement);
    this.value = value;
  }

  get value() {
    return this.#value;
  }

  set value(v) {
    this.#value = v;
    this.#tileElement.textContent = v;
    const power = Math.log2(v);
    const bgLightness = 100 - power * 9;

    this.#tileElement.style.setProperty(
      "--background-lightness",
      `${bgLightness}%`
    );

    this.#tileElement.style.setProperty(
      "--text-lightness",
      `${bgLightness <= 50 ? 90 : 10}%`
    );
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    this.#x = value;
    this.#tileElement.style.setProperty("--x", value);
  }

  get y() {
    return this.#y;
  }

  set y(value) {
    this.#y = value;
    this.#tileElement.style.setProperty("--y", value);
  }

  remove() {
    this.#tileElement.remove();
  }

  waitForTransition(animation = false) {
    return new Promise((resolve) => {
      this.#tileElement.addEventListener(
        animation ? "animationend" : "transitionend",
        resolve,
        {
          once: true,
        }
      );
    });
  }
}
