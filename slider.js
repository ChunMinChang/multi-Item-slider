//   Slider Class contains common used variables
// ----------------------------------------------------------------------------
class Slider {
  constructor(offset = 0, viewWidth = 0, items = 0, itemWidth = 0) {
    console.assert(offset >= 0, "invalid offset!");
    console.assert(viewWidth >= 0, "invalid viewWidth!");
    console.assert(items >= 0, "invalid items!");
    console.assert(itemWidth >= 0, "invalid itemWidth!");

    this.offset = offset;
    this.viewWidth = viewWidth;
    this.items = items;
    this.itemWidth = itemWidth;
  }

  // Getters:
  get viewsInSlider() {
    return this.getViewsInSlider();
  }

  get itemsInView() {
    return this.getItemsInView();
  }

  // Methods:
  getItemsInView() {
    log("slider width: " + this.viewWidth +
        ", item width: " + this.itemWidth);

    if (this.itemWidth <= 0 || this.viewWidth < 0) {
      log("Invalid item width!");
      return;
    }

    // Get pure values of the width of slider and item without unit(px).
    let vw = parseInt(this.viewWidth);
    let iw = parseInt(this.itemWidth);
    let itemsInView = Math.round(vw / iw);
    log("items in view: " + itemsInView);
    return itemsInView;
  }

  getMaxOffset() {
    return this.items - this.getItemsInView();
  }

  getViewsInSlider() {
    return this.getMaxOffset() + 1;
  }
}

//   Utilities
// ----------------------------------------------------------------------------
const Direction = Object.freeze({
  Left: 0,
  Right: 1,
});

function log(msg) {
  console.log(msg);
}

//   Core Scripts
// ----------------------------------------------------------------------------
let sliderSetting = new Slider();

function updatePosition(setting) {
  let silderWindow = document.querySelector(".slider .window");
  let itemWidth = parseInt(setting.itemWidth);
  silderWindow.style.left = -1 * setting.offset * itemWidth;
}

function updateOffset(setting, dir) {
  if (!setting.items) {
    log("No items to scroll!");
    return false;
  }
  log("number of items: " + setting.items);

  if (!setting.viewWidth || !setting.itemWidth) {
    log("Need to wait to get css settings!");
    return false;
  }

  if (setting.items <= setting.itemsInView) {
    log("No need to update position since items are all in the current view.");
    return false;
  }

  let views = setting.viewsInSlider;
  let move = dir ? 1 : -1;
  setting.offset = (setting.offset + move + views) % views;
  log("offset : " + setting.offset);
  return true;
}

function scroll(dir) {
  log("scroll " + (dir ? "right" : "left"));
  if (updateOffset(sliderSetting, dir)) {
    updatePosition(sliderSetting);
  }
}

function initSliderSetting() {
  let silderWindow = document.querySelector(".slider .window");
  sliderSetting.items = silderWindow.querySelectorAll(".item").length;

  let slider = document.querySelector(".slider");
  sliderSetting.viewWidth = window.getComputedStyle(slider).width;

  let silderItem = document.querySelector(".slider .window .item");
  sliderSetting.itemWidth = window.getComputedStyle(silderItem).width;
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