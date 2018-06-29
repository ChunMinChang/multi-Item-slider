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
  constructor(viewWidth = 0, items = 0, itemWidth = 0) {
    console.assert(viewWidth >= 0, "invalid viewWidth!");
    console.assert(items >= 0, "invalid items!");
    console.assert(itemWidth >= 0, "invalid itemWidth!");

    this.distance = 0;
    this.offset = 0;
    this.viewWidth = viewWidth;
    this.items = items;
    this.itemWidth = itemWidth;
  }

  // Methods:
  updateDistance(dir) {
    if (!this.updateOffset(dir)) {
      return false;
    }
    this.distance = this.offset * this.itemWidth;
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

  getMaxOffset() {
    return this.items - this.getItemsInView();
  }

  getViewsInSlider() {
    return this.getMaxOffset() + 1;
  }
}

//   Core Scripts
// ----------------------------------------------------------------------------
let sliderSetting = new Slider();

function updatePosition(dir, setting) {
  if (!setting.updateDistance(dir)) {
    return;
  }
  let silderWindow = document.querySelector(".slider .window");
  silderWindow.style.left = -1 * setting.distance;
}

function scroll(dir) {
  log("scroll " + (dir ? "right" : "left"));
  updatePosition(dir, sliderSetting);
}

function initSliderSetting() {
  let slider = document.querySelector(".slider");
  let silderWindow = document.querySelector(".slider .window");
  let silderItem = document.querySelector(".slider .window .item");

  sliderSetting.items = silderWindow.querySelectorAll(".item").length;
  // Get pure values of the width of slider and item without unit(px).
  sliderSetting.viewWidth = parseInt(window.getComputedStyle(slider).width);
  sliderSetting.itemWidth = parseInt(window.getComputedStyle(silderItem).width);
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
      initSliderSetting();
      break;
    default:
      console.error("This browser doesn't follow the DOM Event spec!");
      break;
  }
});