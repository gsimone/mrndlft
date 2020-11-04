function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

class NetflixSlider {
  constructor(container) {
    this.container = container;
    this.activeX = this.activeY = 0;
    this.childrenArr = Array.from(this.container.children);
    this.handleResize();
  }

  handleResize() {
    this.isMobile = window.innerWidth < 800;
    this.update();
  }

  bindEvent(name, handler) {
    this.container.addEventListener(name, handler);
  }

  bindEvents() {
    this.bindEvent("mousemove", this.handleMouseMove.bind(this));
    this.bindEvent("touchmove", this.handleTouchMove.bind(this));

    window.addEventListener("resize", this.handleResize.bind(this));
  }

  // touchmove adapter
  handleTouchMove(e) {
    this.handleMouseMove(e.touches[0]);
  }

  handleMouseMove(e) {
    const containerBox = this.container.getBoundingClientRect();

    const relX = e.clientX - containerBox.x;
    const relY = e.clientY - containerBox.y;

    const percentX = relX / containerBox.width;
    const percentY = relY / containerBox.height;

    const activeX = Math.floor(this.container.children.length * percentX);
    const activeY = Math.floor(this.container.children.length * percentY);

    if (activeX !== this.activeX && !this.isMobile) {
      this.activeX = clamp(activeX, 0, this.childrenArr.length - 1);
      this.update();
    }

    if (activeY !== this.activeY && this.isMobile) {
      this.activeY = clamp(activeY, 0, this.childrenArr.length - 1);
      this.update();
    }
  }

  update() {
    requestAnimationFrame(() => {
      const activeIndex = this.isMobile ? this.activeY : this.activeX;
      this.childrenArr.forEach((child, i) => {
        child.classList.toggle("before", i < activeIndex);
        child.classList.toggle("active", i === activeIndex);
        child.classList.toggle("after", i > activeIndex);
      });

      this.onChange(this.isMobile ? this.activeY : this.activeX)
    });
  }
  
onChange() { }

  init() {
    this.bindEvents();
  }
}

export default NetflixSlider;
