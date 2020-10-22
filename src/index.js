// import "./styles.css";
import StretchEffect from "./stretch-effect";
import NetflixSlider from "./netflix-slider";

const container = document.body;
const itemsWrapper = document.querySelector(".grid");
const preloadImages = () => {
  return new Promise((resolve, reject) => {
    imagesLoaded(document.querySelectorAll("img"), resolve);
  });
};

preloadImages().then(() => {
  document.body.classList.remove("loading");

  const effect = new StretchEffect(container, itemsWrapper);
  const slider = new NetflixSlider(document.querySelector(".grid"));
  slider.init();
});
