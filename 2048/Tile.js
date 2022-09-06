export default class Tile {
    #tileElement;
    #x;
    #y;
    #value;

    constructor(tileContainer, value = Math.random() > .5 ? 2 : 4) {
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
        const backgroundLightness = 80 - power * 5;
        const backgroundColor = (11 - power) * 5;
        this.#tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
        this.#tileElement.style.setProperty("--background-color", backgroundColor);
        this.#tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
    }

    set x(x) {
        this.#x = x;
        this.#tileElement.style.setProperty("--x", x);
    }

    set y(y) {
        this.#y = y;
        this.#tileElement.style.setProperty("--y", y);
    }

    remove() {
        this.#tileElement.remove();
    }

    waitForTransition(animation = false) {
        return new Promise(resolve => {
            this.#tileElement.addEventListener(animation ? "animationend" : "transitionend", resolve, {
                once: true,
            });
        });
    }
}