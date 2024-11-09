import Timeout from "./Timeout.js";
export default class Slide {
    container;
    slides;
    controls;
    time;
    index;
    slide;
    timeout;
    constructor(container, slides, controls, time = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.index = 0;
        this.slide = this.slides[this.index];
        this.timeout = null;
        this.init();
    }
    hide(element) {
        element.classList.remove('active');
    }
    show(index) {
        this.index = index;
        this.slide = this.slides[this.index];
        this.slides.forEach(el => this.hide(el));
        this.slide.classList.add('active');
        this.auto(this.time);
    }
    addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerText = "Slide Anterior";
        nextButton.innerText = "Próximo Slide";
        nextButton.addEventListener("pointerup", () => this.next());
        prevButton.addEventListener("pointerup", () => this.prev());
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
    }
    auto(time) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
    }
    prev() {
        const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
        this.show(prev);
    }
    next() {
        const next = (this.index + 1) < this.slides.length ? this.index + 1 : 0;
        this.show(next);
    }
    init() {
        this.addControls();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slide.js.map