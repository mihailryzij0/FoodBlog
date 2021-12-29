export class Slider {
  constructor(selector, settings) {
    this.sliderWrapper = selector.querySelector(".slider__wrapper");
    this.sliderImg = selector.querySelectorAll(".slider__item-img");
    this.btnPrev = selector.querySelector(".slider__control_prev");
    this.btnNext = selector.querySelector(".slider__control_next");
    this.sliderControl = selector.querySelectorAll(".slider__control");
    this.dots;
    this.current = 0;
    this.config = {
      autoplay: false,
      interval: 5000,
      doots: true,
    };

    Object.keys(settings).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(this.config, key)) {
        this.config[key] = settings[key];
      }
    });
    this.createDots();
    this.addListener();
    this.autoplay();
    this.addСlasses();
  }

  createDots() {
    if (this.config.doots === true) {
      let listDoots = `<ul class= 'slider__dots-box' >`;
      for (let i = 0; i < this.sliderImg.length; i += 1) {
        listDoots += `<li style= "flex-basis:${+`${
          100 / this.sliderImg.length - 1
        }`}% " class= 'slider__dot'></li>`;
      }
      listDoots += `</li>`;
      this.sliderWrapper.insertAdjacentHTML("beforeend", listDoots);
      this.dots = this.sliderWrapper.querySelectorAll(".slider__dot");
    }
  }

  addListener() {
    this.btnNext.addEventListener("click", () => this.sliderNext());
    this.btnPrev.addEventListener("click", () => this.sliderPrev());
    for (let index = 0; index < this.dots.length; index += 1) {
      this.dots[index].addEventListener("click", () => {
        this.current = index;
        this.addСlasses();
      });
    }
  }

  autoplay() {
    if (this.config.autoplay === true) {
      const x = setInterval(() => this.sliderNext(), this.config.interval);
      this.sliderControl.forEach((el) => {
        el.addEventListener("click", () => clearInterval(x));
      });
      this.dots.forEach((el) => {
        el.addEventListener("click", () => clearInterval(x));
      });
    }
  }

  sliderNext() {
    if (this.current + 1 === this.sliderImg.length) {
      this.current = 0;
    } else {
      this.current += 1;
    }
    this.addСlasses();
  }

  sliderPrev() {
    if (this.current <= 0) {
      this.current = this.sliderImg.length - 1;
    } else {
      this.current -= 1;
    }
    this.addСlasses();
  }

  addСlasses() {
    this.sliderImg.forEach((item) => {
      item.classList.add("slider__item-img_activ");
    });
    this.sliderImg[this.current].classList.remove("slider__item-img_activ");
    this.dots.forEach((item) => {
      item.classList.remove("slider__dot_activ");
    });
    this.dots[this.current].classList.add("slider__dot_activ");
  }
}
