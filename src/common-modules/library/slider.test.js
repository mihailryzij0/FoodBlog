import { Slider } from "./slider";
describe("Slider", () => {
  let el;
  let slider,sliderImg,btnPrev,btnNext;
  beforeEach(() => {
    el = document.createElement("div");
    document.body.append(el);
    el.innerHTML = `  
    <div class="slider">
      <div class="slider__wrapper">
          <div class="slider__item">
          <img class="slider__item-img" alt="keik" />
          </div>
          <div class="slider__item">
          <img class="slider__item-img" alt="keik" />
          </div>
          <div class="slider__item">
          <img class="slider__item-img" alt="keik" />
          </div>
          <button class="slider__control slider__control_prev"></button>
          <button class="slider__control slider__control_next"></button>    
      </div>
    </div>
      `;
      slider = el.querySelector(".slider");
      btnPrev = el.querySelector(".slider__control_prev");
      btnNext = el.querySelector(".slider__control_next");
      sliderImg = el.querySelectorAll(".slider__item-img");
      jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
  });
  afterEach(() => {
    document.querySelector("div").innerHTML = null;
  });
  function hD(htmlEl, selClass){
    expect(htmlEl.classList.contains(selClass)).toBeTruthy();
  }
  it("checking the initial operation of the slide", ()=>{
    new Slider(document.querySelector(".slider"), {
      autoplay: true,
      interval: 5000,
      doots: true,
    });
    const sliderDots = el.querySelectorAll(".slider__dot");
    const sliderImgActiv = el.querySelectorAll(".slider__item-img_activ");
    expect(sliderImgActiv.length).toBe(2)
    expect(sliderDots.length).toBe(3)
    hD(sliderImg[1],"slider__item-img_activ");
    hD(sliderDots[0],"slider__dot_activ");
  })
  it("checking the operation of the buttons and flipping the slider", ()=>{
    new Slider(document.querySelector(".slider"), {
      autoplay: true,
      interval: 5000,
      doots: true,
    });
    const sliderDots = el.querySelectorAll(".slider__dot");
    btnPrev.dispatchEvent(new Event("click"));
    hD(sliderImg[1],"slider__item-img_activ");
    hD(sliderDots[2],"slider__dot_activ");
    btnNext.dispatchEvent(new Event("click"));
    btnNext.dispatchEvent(new Event("click"));
    hD(sliderDots[1],"slider__dot_activ");
    // expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  })

});
