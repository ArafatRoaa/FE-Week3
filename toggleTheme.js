// 1 light, 0 dark
var theme = 1;

function toggleTheme() {
  console.log("before", theme);
  if (theme) {
    //darken
    Darken();

    //clear theme
    theme = 0;
  } else {
    //lighten
    lighten();

    //set theme
    theme = 1;
  }
  console.log("after", theme);
}

function Darken() {
  var element = document.getElementById("body");
  element.classList.replace("bg-light", "bodyDark");

  var elements = document.getElementsByClassName("themedBg");
  for (var i = 0, length = elements.length; i < length; i++) {
    elements[i].classList.replace("bg-white", "elementsDark");
  }

  elements = document.getElementsByClassName("iconSearch");
  for (var i = 0, length = elements.length; i < length; i++) {
    elements[i].classList.remove("text-secondary");
    elements[i].classList.toggle("icon");
  }

  elements = document.getElementsByClassName("themedText");
  for (var i = 0, length = elements.length; i < length; i++) {
    elements[i].classList.replace("text-dark", "text-white");
  }

  element = document.getElementById("icon");
  element.classList.toggle("icon");
  element.classList.remove("bi-moon");
  element.classList.toggle("bi-moon-fill");
}

function lighten() {
  var element = document.getElementById("body");
  element.classList.replace("bodyDark", "bg-light");

  var elements = document.getElementsByClassName("themedBg");
  for (var i = 0, length = elements.length; i < length; i++) {
    elements[i].classList.replace("elementsDark", "bg-white");
  }

  elements = document.getElementsByClassName("iconSearch");
  for (var i = 0, length = elements.length; i < length; i++) {
    elements[i].classList.remove("icon");
    elements[i].classList.toggle("text-secondary");
  }

  elements = document.getElementsByClassName("themedText");
  for (var i = 0, length = elements.length; i < length; i++) {
    elements[i].classList.replace("text-white", "text-dark");
  }

  element = document.getElementById("icon");
  element.classList.toggle("icon");
  element.classList.remove("bi-moon-fill");
  element.classList.toggle("bi-moon");
}
