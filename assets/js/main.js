"use strict";

jQuery(function ($) {
  ///////////////////////////////////////////////////////////////   START DOCUMENT READY  ///////////////////////////////////////////////////////////////
  $(document).ready(function () {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="tooltip"]').tooltip({
        customClass: 'tooltip-custom'
      });
      $(".header").addClass("loaded");
      $(".hero h1").addClass("loaded");
      $(".hero-images").addClass("loaded");
    });
    $('.stars .star').on('click', function () {
      var thisThanksMessage = $(this).closest('.stars').find($('.thank-msg')); //alert(thisThanksMessage);

      thisThanksMessage.addClass('d-flex');
      thisThanksMessage.removeClass('d-none');
      setTimeout(function () {
        //alert(thisThanksMessage);
        thisThanksMessage.addClass('d-none');
        thisThanksMessage.removeClass('d-flex');
      }, 3000);
    }); //STICKY CHANGE BG COLOR ON SCROLL  

    if (!$(".sticky-lg-top").hasClass("bg-gradient-custom")) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
          $(".sticky-lg-top").addClass("bg-gradient-custom");
        } else {
          $(".sticky-lg-top").removeClass("bg-gradient-custom");
        }
      });
    }

    document.addEventListener("DOMContentLoaded", function () {
      // make it as accordion for smaller screens
      if (window.innerWidth < 992) {
        // close all inner dropdowns when parent is closed
        document.querySelectorAll('.navbar .dropdown').forEach(function (everydropdown) {
          everydropdown.addEventListener('hidden.bs.dropdown', function () {
            // after dropdown is hidden, then find all submenus
            this.querySelectorAll('.submenu').forEach(function (everysubmenu) {
              // hide every submenu as well
              everysubmenu.style.display = 'none';
            });
          });
        });
        document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
          element.addEventListener('click', function (e) {
            var nextEl = this.nextElementSibling;

            if (nextEl && nextEl.classList.contains('submenu')) {
              // prevent opening link if link needs to open dropdown
              e.preventDefault();

              if (nextEl.style.display == 'block') {
                nextEl.style.display = 'none';
              } else {
                nextEl.style.display = 'block';
              }
            }
          });
        });
      } // end if innerWidth

    }); // DOMContentLoaded  end
    // Indexing all important elements

    $("p").attr("tabindex", "0");
    $(".listing-date").attr("tabindex", "0");
    $(".h1").attr("tabindex", "0");
    $(".h2").attr("tabindex", "0");
    $(".h3").attr("tabindex", "0");
    $(".h4").attr("tabindex", "0");
    $(".footer-title").attr("tabindex", "0");
    $(".related-icon").attr("tabindex", "0");
    $(".related-tooltip").attr("tabindex", "-1");
    $(".caption-txt").attr("tabindex", "0");
    $(".search-icon").click(function () {});
    $(".notification-icon").click(function () {
      $(".notifications").toggleClass("show");
      $(".settings").removeClass("show");
      $(".new-notification").addClass("d-none");
      $(".comment").removeClass("show");
      $("body").addClass("overflow-hidden");
    });
    $(".settings-icon").click(function () {
      $(".settings").toggleClass("show");
      $(".notifications").removeClass("show");
      $(".comment").removeClass("show");
      $("body").addClass("overflow-hidden");
    });
    $(".comment-icon").click(function () {
      $(".comment").toggleClass("show");
      $(".notifications").removeClass("show");
      $(".settings").removeClass("show");
      $("body").addClass("overflow-hidden");
    });
    $(".close-btn").click(function () {
      $(this).parent().parent().parent().removeClass("show");
      $("body").removeClass("overflow-hidden");
    });
    $(".radio-btn").click(function () {
      $(".radio-btn").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");
    }); ////////////////////////////////  ACCESSBILITY START //////////////////////////////////////
    //COLOR RESET

    $(".color-reset").click(function () {
      $(".change-color li:first-child").find("a").click();
    }); //COLOR BLIND

    $("#colorBlind").click(function () {
      $("html").toggleClass("blindFilter");
    }); //COLOR BLIND

    $("#darkSwitch").click(function () {
      $("body").attr('data-theme', function (index, attr) {
        return attr == "dark" ? null : "dark";
      });
    }); //DESCREASE/ INCREASE FONT SIZE

    $(".form-range.size-change").on("input", function () {
      var font = 16 + $(this).val() * 1.1; //console.log(font)

      $('html').css("font-size", font + "px");
    }); //RESET FONT

    $(".reset-font").click(function () {
      $('html').css("font-size", "16px");
      $('.form-range.size-change').val(0);
    }); ////////////////////////////////  ACCESSBILITY END  //////////////////////////////////////
    //TOGGLE OPEN BURGER MENU

    $(".navbar-toggler").click(function () {
      $(this).toggleClass("open");
      $("body").toggleClass("overflow-hidden");
    }); //ISSUE ON FIREFOX RELATED TO FLOAT

    var clear = $(".clear-both");

    if (clear !== null) {
      $(".clear-both").addClass("d-none");
    } //BUTTON CLEAR ON THE DATES


    $(".date-filter .btn-clear").click(function () {
      $(".datepicker input").each(function () {
        $(this).val('');
      });
    }); //BOOKMARK CHANGE ICON 

    $(".bookmark-anchor").click(function () {
      $(this).find("i").toggleClass("d-none");
    }); //CONTACT TABS AND MAP CLICK

    var tab, mapDetails;
    $(".contact-tab").click(function () {
      tab = $(this).attr("data-type");
      $('.map-over-content').each(function () {
        $(this).addClass("d-none");
        mapDetails = $(this).attr("data-type");

        if (mapDetails == tab) {
          $(this).removeClass("d-none");
        }
      });
    }); //CLICKABLE ROWS

    $(".clickable-row").click(function () {
      window.location = $(this).data("href");
    }); //UPLOAD FILE REMOVE BUTTON

    $(".upload-close").click(function () {
      $(this).parent().removeClass("d-flex").addClass("d-none");
    }); //TABLE OVERFLOW SCROLL TURNAROUND

    $("#cbRegisterTableEn").parent().addClass("overflow-scroll"); //SCROLL TO TOP ELEMENT

    $("a.scrollLink").click(function (event) {
      var thisHref = $(this).attr("href");
      var itemId = thisHref.substring(1, thisHref.length);
      setTimeout(function () {
        $('#' + itemId).attr("tabindex", 0).focus();
      }, 200);
      event.preventDefault();
      $("html, body").animate({
        scrollTop: $(thisHref).offset().top - 20
      }, 500);
    }); //CHANGE STATE OF LIKE/DISLIKE ICONS

    $(".fa-thumbs-up").click(function () {
      $(this).removeClass("far").addClass("fa"); //console.log("liked");
    });
    $(".fa-thumbs-down").click(function () {
      $(this).removeClass("far").addClass("fa"); //console.log("disliked");
    });
    document.addEventListener("DOMContentLoaded", function () {
      // make it as accordion for smaller screens
      if (window.innerWidth < 992) {
        // close all inner dropdowns when parent is closed
        document.querySelectorAll('.navbar .dropdown').forEach(function (everydropdown) {
          everydropdown.addEventListener('hidden.bs.dropdown', function () {
            // after dropdown is hidden, then find all submenus
            this.querySelectorAll('.submenu').forEach(function (everysubmenu) {
              // hide every submenu as well
              everysubmenu.style.display = 'none';
            });
          });
        });
        document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
          element.addEventListener('click', function (e) {
            var nextEl = this.nextElementSibling;

            if (nextEl && nextEl.classList.contains('submenu')) {
              // prevent opening link if link needs to open dropdown
              e.preventDefault();

              if (nextEl.style.display == 'block') {
                nextEl.style.display = 'none';
              } else {
                nextEl.style.display = 'block';
              }
            }
          });
        });
      } // end if innerWidth

    }); // DOMContentLoaded  end
  }); ///////////////////////////////////////////////////////////////   END DOCUMENT READY  ///////////////////////////////////////////////////////////////

  $(".header-search-icon").click(function () {
    $(".header-search").addClass("open");
  });
  $(".header-search .close-btn").click(function () {
    $(".header-search").removeClass("open");
  });
  /* $(window).scroll(function () {
      if ($(this).scrollTop() > 170) {
          $(".header").addClass("bg-gradient-custom")
          $(".header").addClass("fixed-top")
          $(".header").removeClass("p-absolute")
      } 
      else if ($(this).scrollTop() < 50){
          $(".header").removeClass("bg-gradient-custom")
          $(".header").removeClass("fixed-top")
          $(".header").addClass("p-absolute")
      }
  }); */
  ///////////////////////////////////////////////////////////////   DATEPICKER CONFIGURATION ///////////////////////////////////////////////////////////////

  /* !function(a){
      a.fn.datepicker.dates.ar={
          days:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"],
          daysShort:["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت","أحد"],
          daysMin:["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت","أحد"],
          months:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
          monthsShort:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
          today:"هذا اليوم",
          rtl:!0
      }
  }(jQuery);
  $(".datepicker-en").datepicker({ 
      autoclose: true, 
      todayHighlight: true,
      orientation: "top left",
      language: 'en'
  });
  $(".datepicker-ar").datepicker({ 
      autoclose: true, 
      todayHighlight: true,
      orientation: "top left",
      language: 'ar'
  }); */
  ///////////////////////////////////////////////////////////////   START DATA SCROLL  ///////////////////////////////////////////////////////////////

  $.fn.moveIt = function () {
    var $window = $(window);
    var instances = [];
    $(this).each(function () {
      instances.push(new moveItItem($(this)));
    });
    window.addEventListener('scroll', function () {
      var scrollTop = $window.scrollTop();
      instances.forEach(function (inst) {
        inst.update(scrollTop);
      });
    }, {
      passive: true
    });
  };

  var moveItItem = function moveItItem(el) {
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed'));
  };

  moveItItem.prototype.update = function (scrollTop) {
    this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
    this.el.css('margin-bottom', -(scrollTop / this.speed) + 'px');
  }; // Initialization


  $(function () {
    $('[data-scroll-speed]').moveIt();
  });

  $.fn.moveItX = function () {
    var $window = $(window);
    var instances = [];
    $(this).each(function () {
      instances.push(new moveItXItem($(this)));
    });
    window.addEventListener('scroll', function () {
      var scrollTop = $window.scrollTop();
      instances.forEach(function (inst) {
        inst.update(scrollTop);
      });
    }, {
      passive: true
    });
  };

  var moveItXItem = function moveItXItem(el) {
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed-x'));
  };

  moveItXItem.prototype.update = function (scrollTop) {
    this.el.css('transform', 'translateX(' + -(scrollTop / this.speed) + 'px)');
  }; // Initialization


  $(function () {
    $('[data-scroll-speed-x]').moveItX();
  }); ///////////////   END DATA SCROLL  ///////////////
  ///////////// MODAL WITH VIDEO ///////////////////

  var vid;
  $(".modal-dialog .btn-close").click(function () {
    vid = $(this).parent().find("video");

    if (vid.html() !== undefined) {
      vid.pause();
    }
  });
  $(".swiper").each(function () {
    if ($(this).find(".swiper-slide").length == 1) {
      $(this).find(".swiper-nav").addClass("d-none");
    }
  });
  $('button[data-bs-toggle="pill"]').on('shown.bs.tab', function (e) {
    var paneTarget = $(e.target).attr('data-bs-target');
    var $thePane = $(paneTarget);
    setTimeout(function () {
      var height = $thePane.find(".swiper-wrapper .swiper-slide-active .container").height();
      $thePane.find(".vSwiper-wrapper").css('height', height + 30);
    }, 100);
  }); ///////////////////////////////////////////////////////////////   MOBILE QUERIES  ///////////////////////////////////////////////////////////////

  var width = $(window).width();
  var swiperInlineHeight, parent, activeH;

  if (width < 1024) {
    $("header").removeClass("bg-white-custom");
    $(".header-search-icon").click(function () {
      $("body").addClass("overflow-hidden");
    });
    $(".header-search .close-btn").click(function () {
      $("body").removeClass("overflow-hidden");
    }); ////////////// VERTICAL SWIPER HEIGHT FIX //////////

    $(window).on('load', function () {
      $(".vSwiper-wrapper").each(function () {
        if (!$(this).hasClass("timeline")) {
          swiperInlineHeight = $(this).find(".swiper-wrapper .swiper-slide-active .container").height() + 30;
          $(this).css('height', swiperInlineHeight + 30);
          $(this).find(".swiper-button-next").click(function () {
            parent = $(this).parent().parent().parent().parent();
            parent.find(".swiper-slide-active").addClass("active");
            activeH = parent.find(".swiper-slide-active .container").height();
            parent.css('height', activeH + 30);
          });
          $(this).find(".swiper-button-prev").click(function () {
            parent = $(this).parent().parent().parent().parent();
            parent.find(".swiper-slide-active").addClass("active");
            activeH = parent.find(".swiper-slide-active .container").height();
            parent.css('height', activeH + 30);
          });
        }
      });
    });
  } else if (width >= 1024) {
    var counterDrop = 0;
    /* $('.header .dropdown').mouseenter(function(){
        console.log("mouseenter--")
        setTimeout(() => {
            $(this).click();
        }, 100);
    });
    $('.header .dropdown').mouseleave(function(){
        console.log("mouseleave--")
        setTimeout(() => {
            $(this).click();
        }, 100);
    }); */

    /*$('.header .dropdown').hover(
        function(){
            if($(this).find(".dropdown-menu").hover()){
                console.log("mouse over me")
                $(this).find(".dropdown-menu").addClass("show")
                $("header").addClass("bg-white-custom")
                $("main").addClass("overlay")
            }
            console.log("hovered in 1")
        }, 
        function(){
            $(this).find(".dropdown-menu").removeClass("show")
            $("header").removeClass("bg-white-custom")
            $("main").removeClass("overlay")
            console.log("hovered out")
    });
     $('.header .dropdown').click(function(){
        $('.header .dropdown').each(function(){
            if($(this).find(".dropdown-menu").hasClass("show")){
                counterDrop ++;
            }
        })
        if(counterDrop != 0){
            $("header").addClass("bg-white-custom")
            $("main").addClass("overlay")
        }
    })*/

    $('.header .dropdown').hover(function () {
      var dropdownMenu = $(this).children(".dropdown-menu");

      if (dropdownMenu.is(":visible")) {
        dropdownMenu.parent().addClass("open");
        $("header").addClass("bg-white-custom");
        $("main").addClass("overlay");
      } else {
        dropdownMenu.parent().removeClass("open");
        $("header").removeClass("bg-white-custom");
        $("main").removeClass("overlay");
      }
    });
    $('.header .dropdown').on('hide.bs.dropdown', function () {
      var counterHide = 0;
      setTimeout(function () {
        $('.header .dropdown').each(function () {
          if ($(this).find(".dropdown-menu").hasClass("show")) {
            counterHide++;
          }
        }); //console.log("counter" + counterHide);

        if (counterHide == 0) {
          $("header").removeClass("bg-white-custom");
          $("main").removeClass("overlay");
        }
      }, 500);
    });
    $(".header-search-icon").click(function () {
      $("header").addClass("bg-white-custom");
      $("main").addClass("overlay");
    });
    $(".header-search .close-btn").click(function () {
      $("header").removeClass("bg-white-custom");
      $("main").removeClass("overlay");
    }); ////////////// VERTICAL SWIPER HEIGHT FIX //////////

    $(window).on('load', function () {
      $(".vSwiper-wrapper").each(function () {
        if (!$(this).hasClass("timeline")) {
          swiperInlineHeight = $(this).find(".swiper-wrapper .swiper-slide-active .container").height() + 30;
          $(this).css('height', swiperInlineHeight);
          $(this).find(".swiper-button-next").click(function () {
            parent = $(this).parent().parent().parent().parent();
            parent.find(".swiper-slide-active").addClass("active");
            activeH = parent.find(".swiper-slide-active .container").height();
            parent.css('height', activeH);
          });
          $(this).find(".swiper-button-prev").click(function () {
            parent = $(this).parent().parent().parent().parent();
            parent.find(".swiper-slide-active").addClass("active");
            activeH = parent.find(".swiper-slide-active .container").height();
            parent.css('height', activeH);
          });
        }
      });
    });
    /* $('.header .dropdown').each(function(){
        $(this).on('show.bs.dropdown', function () {
            console.log("show")
            $("header").addClass("bg-white-custom")
        })
    })
    $('.header .dropdown').each(function(){
        $(this).on('hide.bs.dropdown', function () {
            $('.header .dropdown').each(function(){
                if($(this).hasClass("show")){
                    console.log("hideIf")
                    $("header").addClass("bg-white-custom")
                }
                else{
                    console.log("hideElse")
                    $("header").removeClass("bg-white-custom")
                }
            })
        })
    }) */
  }
});