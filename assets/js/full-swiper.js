"use strict";

jQuery(function ($) {
  $(document).ready(function () {
    var swiper = new Swiper(".full-swiper", {
      slidesPerView: 2,
      spaceBetween: 100,
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar"
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
    swiper.on('reachEnd', function () {
      console.log("reach to End");
      $(".swiper-wrapper .swiper-slide").last().addClass("active");
    });
    /* swiper.on('slideChange', function () {
        console.log('slide changed');
    }); */
  });
});