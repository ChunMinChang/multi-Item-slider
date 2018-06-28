let offset = 0;
function slideItems(dir) {
  console.log("Slide " + dir);

  let silderWindow = document.querySelector(".slider .window");
  let numOfItems = silderWindow.querySelectorAll(".item").length;
  console.log("number of items: " + numOfItems);

  offset = (offset + numOfItems + (dir == "left" ? -1 : 1)) % numOfItems
  console.log("offset: " + offset);
  silderWindow.style.left = offset * -30 + "vw";
}

function registerEvent(element, event, callback) {
  element.addEventListener(event, callback);
}

function registerButtonEvents() {
  let leftBtn = document.querySelector(".slider .left");
  registerEvent(leftBtn, "click", function(e) { slideItems("left"); });

  let rightBtn = document.querySelector(".slider .right");
  registerEvent(rightBtn, "click", function(e) { slideItems("right"); });
}

document.addEventListener("DOMContentLoaded", function(event) {
  registerButtonEvents();
});