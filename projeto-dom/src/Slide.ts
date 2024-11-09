import Timeout from "./Timeout.js";

export default class Slide {
  container;
  slides;
  controls;
  time;
  index: number;
  slide: Element;
  timeout: Timeout | null;
  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;

    this.index = 0;
    this.slide = this.slides[this.index];

    this.timeout = null;

    this.init();
  }

  hide(element: Element) {
    element.classList.remove('active');
  }

  show(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    this.slides.forEach(el => this.hide(el));
    this.slide.classList.add('active');
    this.auto(this.time);
  }

  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.innerText = "Slide Anterior";
    nextButton.innerText = "Próximo Slide";

    nextButton.addEventListener("pointerup", () => this.next())
    prevButton.addEventListener("pointerup", () => this.prev())

    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);
  }

  auto(time: number) {
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

  private init() {
    this.addControls();
    this.show(this.index);
  }
}