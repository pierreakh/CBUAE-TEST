"use strict";

/*!
 * Dark Mode Switch v1.0.1 (https://github.com/coliff/dark-mode-switch)
 * Copyright 2021 C.Oliff
 * Licensed under MIT (https://github.com/coliff/dark-mode-switch/blob/main/LICENSE)
 */
var colorBlind = document.getElementById("colorBlind");
window.addEventListener("load", function () {
  if (colorBlind) {
    initTheme();
    colorBlind.addEventListener("change", function () {
      resetTheme();
    });
  }
});
/**
 * Summary: function that adds or removes the attribute 'data-color' depending if
 * the switch is 'on' or 'off'.
 *
 * Description: initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the html named: 'data-color' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-color' attribute will not be set.
 * @return {void}
 */

function initTheme() {
  var darkThemeSelected = localStorage.getItem("colorBlind") !== null && localStorage.getItem("colorBlind") === "blindFilter";
  colorBlind.checked = darkThemeSelected;
  darkThemeSelected ? document.body.parentNode.setAttribute("data-color", "blindFilter") : document.body.parentNode.removeAttribute("data-color");
}
/**
 * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the.body.parentNode attribute 'data-color' to dark so the dark-theme CSS is
 * applied.
 * @return {void}
 */


function resetTheme() {
  if (colorBlind.checked) {
    document.body.parentNode.setAttribute("data-color", "blindFilter");
    localStorage.setItem("colorBlind", "blindFilter");
  } else {
    document.body.parentNode.removeAttribute("data-color");
    localStorage.removeItem("colorBlind");
  }
}