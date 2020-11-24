// import "./styles.css";
import StretchEffect from "./stretch-effect";
import NetflixSlider from "./netflix-slider";

const container = document.body;
const itemsWrapper = document.querySelector(".grid");

document.body.classList.remove("loading");

const effect = new StretchEffect(container, itemsWrapper);
const slider = new NetflixSlider(document.querySelector(".grid"));
slider.init();

const titles = Array.from(document.querySelectorAll('.title-w .w-dyn-item'))

function is_touch_device() {  
  try {  
    document.createEvent("TouchEvent");  
    return true;  
  } catch (e) {  
    return false;  
  }  
}
effect.isMobile = is_touch_device()
window.addEventListener("resize", () => {
  effect.isMobile = is_touch_device()
});

slider.onChange = (activeIndex) => {
  titles.forEach((title, i) => {
    title.classList.toggle("active", activeIndex === i)
  })
}
