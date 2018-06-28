let sliderSetting = {
  offset: 0,
  width: 0,
  items: 0,
  itemWidth: 0,
}

function scroll(dir) {
  console.log("scroll " + dir);
  if (!sliderSetting.items) {
    console.log("No items to scroll!");
    return;
  }

  if (!sliderSetting.width || !sliderSetting.itemWidth) {
    console.log("Need to wait to get css settings!");
    return;
  }

  console.log("number of items: " + sliderSetting.items);

  let sliderWidth = parseInt(sliderSetting.width);
  console.log("slider width: " + sliderSetting.width);

  let itemWidth = parseInt(sliderSetting.itemWidth);
  console.log("Item width: " + sliderSetting.itemWidth);

  let itemsInWindow = Math.round(sliderWidth / itemWidth);
  console.log("items in window: " + itemsInWindow);

  let maxOffset = sliderSetting.items - itemsInWindow + 1;
  sliderSetting.offset += (dir == "left" ? -1 : 1) + maxOffset;
  sliderSetting.offset %= maxOffset;
  console.log("offset: " + sliderSetting.offset);

  let silderWindow = document.querySelector(".slider .window");
  silderWindow.style.left = -1 * sliderSetting.offset * itemWidth;
}

function setSlider() {
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
  registerEvent(leftBtn, "click", function(e) { scroll("left"); });

  let rightBtn = document.querySelector(".slider .right");
  registerEvent(rightBtn, "click", function(e) { scroll("right"); });
}

document.addEventListener("readystatechange", event => {
  switch (event.target.readyState) {
    case "loading":
      console.log("The document is loading...");
      break;
    case "interactive":
      console.log("The document is loaded but subresources " +
                  "like images, css may still be loading.");
      // Init.
      registerButtonEvents();
      break;
    case "complete":
      console.log("The page is fully loaded!");
      // Get css values.
      setSlider();
      break;
    default:
      console.error("This browser doesn't follow the DOM Event spec!");
      break;
  }
});