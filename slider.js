//   Utilities
// ----------------------------------------------------------------------------
const Direction = Object.freeze({
  Left: 0,
  Right: 1,
});

function log(msg) {
  console.log(msg);
}

//   Slider class
// ----------------------------------------------------------------------------
class Slider {
  constructor(start = 0, viewWidth = 0, items = 0, itemWidth = 0) {
    console.assert(start > -1 && start <= 0, "invalid start!");
    console.assert(viewWidth >= 0, "invalid viewWidth!");
    console.assert(items >= 0, "invalid items!");
    console.assert(itemWidth >= 0, "invalid itemWidth!");

    this.distance = 0;
    this.offset = 0;
    this.start = start;
    this.viewWidth = viewWidth;
    this.items = items;
    this.itemWidth = itemWidth;
  }

  // Methods:
  updateDistance() {
    this.distance = (this.start + this.offset) * this.itemWidth;
  }

  slide(dir) {
    if (!this.updateOffset(dir)) {
      return false;
    }
    this.updateDistance();
    return true;
  }

  updateOffset(dir) {
    if (!this.items || !this.viewWidth || !this.itemWidth ||
        this.getItemsInView() <= 0 || 
        this.items <= this.getItemsInView()) {
      return false;
    }

    let views = this.getViewsInSlider();
    let move = dir ? 1 : -1;
    // Add `views` before calculating modulo to avoid negative results.
    this.offset = (this.offset + move + views) % views;
    return true;
  }

  getItemsInView() {
    if (this.itemWidth <= 0 || this.viewWidth < 0) {
      return -1;
    }

    return Math.round(this.viewWidth / this.itemWidth);
  }

  getViewsInSlider() {
    return this.getMaxOffset() + 1;
  }

  getMaxOffset() {
    console.assert(this.start > -1 && this.start <= 0, "invalid start!");
    let padding = this.start < 0 ? 1 : 0;
    return this.items - this.getItemsInView() + padding;
  }
}

//   Core Scripts
// ----------------------------------------------------------------------------
let sliderObj = new Slider();

function setPosition(slider) {
  let silderWindow = document.querySelector(".slider .window");
  silderWindow.style.left = -1 * slider.distance + "px";
}

function updatePosition(dir, slider) {
  if (!slider.slide(dir)) {
    return;
  }
  setPosition(slider);
}

function scroll(dir) {
  log("scroll " + (dir ? "right" : "left"));
  updatePosition(dir, sliderObj);
}

function initSlider() {
  let slider = document.querySelector(".slider");
  let silderWindow = document.querySelector(".slider .window");
  let silderItem = document.querySelector(".slider .window .item");

  sliderObj.items = silderWindow.querySelectorAll(".item").length;
  // Get pure values of the width of slider and item without unit(px).
  sliderObj.viewWidth = parseInt(window.getComputedStyle(slider).width);
  sliderObj.itemWidth = parseInt(window.getComputedStyle(silderItem).width);

  initPosition(sliderObj);
}

function initPosition(slider) {
  slider.start = - 0.5;
  slider.updateDistance();
  setPosition(slider);
}

function registerEvent(element, event, callback) {
  element.addEventListener(event, callback);
}

function registerButtonEvents() {
  let leftBtn = document.querySelector(".slider .left");
  registerEvent(leftBtn, "click", function(e) { scroll(Direction.Left); });

  let rightBtn = document.querySelector(".slider .right");
  registerEvent(rightBtn, "click", function(e) { scroll(Direction.Right); });
}

document.addEventListener("readystatechange", event => {
  switch (event.target.readyState) {
    case "loading":
      log("The document is loading...");
      break;
    case "interactive":
      log("The document is loaded but subresources " +
          "like images, css may still be loading.");
      // Init.
      registerButtonEvents();
      break;
    case "complete":
      log("The page is fully loaded!");
      // Get css values.
      initSlider();
      break;
    default:
      console.error("This browser doesn't follow the DOM Event spec!");
      break;
  }
});