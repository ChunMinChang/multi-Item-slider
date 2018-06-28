let offset = 0;
function scroll(dir) {
  console.log("scroll " + dir);

  let silderWindow = document.querySelector(".slider .window");
  let numOfItems = silderWindow.querySelectorAll(".item").length;
  console.log("number of items: " + numOfItems);

  let slider = document.querySelector(".slider");
  let sliderWidth = window.getComputedStyle(slider).width;
  let sliderWidthValue = parseInt(sliderWidth);
  console.log("slider width: " + sliderWidth);

  let silderItem = document.querySelector(".slider .window .item");
  let itemWidth = window.getComputedStyle(silderItem).width;
  let itemWidthValue = parseInt(itemWidth);
  console.log("Item width: " + itemWidth);

  let itemsInWindow = Math.round(sliderWidthValue / itemWidthValue);
  console.log("items in window: " + itemsInWindow);

  let maxOffset = numOfItems - itemsInWindow + 1;
  offset = (offset + maxOffset + (dir == "left" ? -1 : 1)) % maxOffset;
  console.log("offset: " + offset);

  silderWindow.style.left = -1 * offset * itemWidthValue;
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

document.addEventListener("DOMContentLoaded", function(event) {
  registerButtonEvents();
});