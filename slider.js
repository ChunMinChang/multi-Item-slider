const Direction = Object.freeze({
  Left: 0,
  Right: 1,
});

let sliderSetting = {
  offset: 0,
  width: 0,
  items: 0,
  itemWidth: 0,
};

function log(msg) {
  console.log(msg);
}

function updatePosition(offset) {
  let silderWindow = document.querySelector(".slider .window");
  let itemWidth = parseInt(sliderSetting.itemWidth);
  silderWindow.style.left = -1 * offset * itemWidth;
}

function updateOffset(setting, dir) {
  if (!setting.items) {
    log("No items to scroll!");
    return false;
  }
  log("number of items: " + sliderSetting.items);

  if (!sliderSetting.width || !sliderSetting.itemWidth) {
    log("Need to wait to get css settings!");
    return false;
  }
  log("slider width: " + setting.width +
      ", item width: " + setting.itemWidth);

  // Get pure values of the width of slider and item without unit(px).
  let sliderWidth = parseInt(setting.width);
  let itemWidth = parseInt(setting.itemWidth);

  let itemsInView = Math.round(sliderWidth / itemWidth);
  log("items in window: " + itemsInView);

  if (setting.items <= itemsInView) {
    return false;
  }

  let maxOffset = setting.items - itemsInView;
  let viewsInWindow = maxOffset + 1;
  let move = dir ? 1 : -1;
  setting.offset = (setting.offset + move + viewsInWindow) % viewsInWindow;
  log("offset : " + setting.offset);
  return true;
}

function scroll(dir) {
  log("scroll " + (dir ? "right" : "left"));
  if (updateOffset(sliderSetting, dir)) {
    updatePosition(sliderSetting.offset);
  }
}

function initSliderSetting() {
  let silderWindow = document.querySelector(".slider .window");
  sliderSetting.items = silderWindow.querySelectorAll(".item").length;

  let slider = document.querySelector(".slider");
  sliderSetting.width = window.getComputedStyle(slider).width;

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