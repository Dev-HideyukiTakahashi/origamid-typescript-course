import Timeout from "./Timeout.js";
export default class Slide {
    container;
    slides;
    controls;
    time;
    index;
    slide;
    timeout;
    pausedTimeout;
    paused;
    constructor(container, slides, controls, time = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.index = 0;
        this.slide = this.slides[this.index];
        this.timeout = null;
        this.pausedTimeout = null;
        this.paused = false;
        this.init();
    }
    hide(element) {
        element.classList.remove('active');
        if (element instanceof HTMLVideoElement) {
            element.currentTime = 0;
            element.pause();
        }
    }
    show(index) {
        this.index = index;
        this.slide = this.slides[this.index];
        this.slides.forEach(el => this.hide(el));
        this.slide.classList.add('active');
        if (this.slide instanceof HTMLVideoElement) {
            this.autoVideo(this.slide);
        }
        else {
            this.auto(this.time);
        }
    }
    autoVideo(video) {
        video.muted = true;
        video.play();
        let firstPlay = true;
        video.addEventListener('playing', () => {
            if (firstPlay)
                this.auto(video.duration * 1000);
            firstPlay = false;
        });
    }
    addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerText = "Slide Anterior";
        nextButton.innerText = "Próximo Slide";
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        this.controls.addEventListener('pointerdown', () => this.pause());
        this.controls.addEventListener('pointerup', () => this.continue());
        nextButton.addEventListener("pointerup", () => this.next());
        prevButton.addEventListener("pointerup", () => this.prev());
    }
    auto(time) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
    }
    prev() {
        if (this.paused)
            return;
        const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
        this.show(prev);
    }
    next() {
        if (this.paused)
            return;
        const next = (this.index + 1) < this.slides.length ? this.index + 1 : 0;
        this.show(next);
    }
    pause() {
        this.pausedTimeout = new Timeout(() => {
            this.timeout?.pause();
            this.paused = true;
            if (this.slide instanceof HTMLVideoElement)
                this.slide.pause();
        }, 400);
    }
    continue() {
        this.pausedTimeout?.clear();
        if (this.paused) {
            this.paused = false;
            this.timeout?.continue();
            if (this.slide instanceof HTMLVideoElement)
                this.slide.play();
        }
    }
    init() {
        this.addControls();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slide.js.map