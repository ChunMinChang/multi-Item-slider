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

document.addEventListener("readystatechange", event => {
  switch (event.target.readyState) {
    case "loading":
      console.log("The document is loading...");
      break;
    case "interactive":
      console.log("The document is loaded but subresources " +
                  "like images, css may still be loading.");
      break;
    case "complete":
      console.log("The page is fully loaded!");
      registerButtonEvents();
      break;
    default:
      console.error("This browser doesn't follow the DOM Event spec!");
      break;
  }
});