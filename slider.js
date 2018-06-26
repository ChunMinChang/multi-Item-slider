function slideItems(dir) {
  console.log("Slide " + dir);
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