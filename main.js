"use strict";

$(document).ready(function () {
  svg4everybody({});

  var sandwich = function sandwich() {
    $(document).on("click", ".catalog-nav__header", function () {
      var sandwich = $(this).find('.sandwich'),
          catalog = $(this).parent();

      if ($(window).width() < 768) {
        if ($('.mobile-nav__wrapper').hasClass('mobile-nav__wrapper--active')) {
          $('.mobile-nav__wrapper').removeClass('mobile-nav__wrapper--active');
          $('.sandwich').removeClass('sandwich--active');
          catalog.toggleClass("catalog-nav--active");
        } else {
          $('body').toggleClass('fixed');
          catalog.toggleClass("catalog-nav--active");
          $('.search').removeClass('search-mobile--active');
        }
      } else {
        sandwich.toggleClass("sandwich--active");
        catalog.toggleClass("catalog-nav--active");
      }
    });

    if ($(window).width() < 768) {
      $(document).on("click", ".sandwich", function () {
        if ($('.catalog-nav').hasClass('catalog-nav--active')) {
          $('.catalog-nav').removeClass('catalog-nav--active');
          $(this).toggleClass("sandwich--active");
          $('.mobile-nav__wrapper').toggleClass('mobile-nav__wrapper--active');
          $('.search').removeClass('search-mobile--active');
        } else {
          $(this).toggleClass("sandwich--active");
          $('body').toggleClass('fixed');
          $('.mobile-nav__wrapper').toggleClass('mobile-nav__wrapper--active');
          $('.search').removeClass('search-mobile--active');
        }
      });
    }
  };

  var popularCategoriesSlider = function popularCategoriesSlider() {
    if ($(window).width() < 767) {
      $('.js-categories-prev').slick({
        slidesToShow: 1,
        prevArrow: '.categories-prev__btn--prev',
        nextArrow: '.categories-prev__btn--next',
        adaptiveHeight: true,
        infinite: false,
        dots: true
      });
    }
  };

  var productPrevSlider = function productPrevSlider() {
    var prodSlider = $('.js-product-slider');
    prodSlider.slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      prevArrow: '.products-prev-slider__nav-prev',
      nextArrow: '.products-prev-slider__nav-next',
      infinite: false,
      responsive: [{
        breakpoint: 1239,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrow: false,
          dots: true
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: true,
          dots: false
        }
      }]
    });
  };

  var catalogNav = function catalogNav() {
    if ($(window).width() > 767) {
      $('.catalog-nav__item').hover(function () {
        var catalogBody = $(this).closest('.catalog-nav__body');
        catalogBody.css('width', 825);
      }, function () {
        var catalogBody = $(this).closest('.catalog-nav__body');
        catalogBody.css('width', 'auto');
      });
    } else {
      $(document).on('click', '.catalog-nav__label', function () {
        $(this).parent().toggleClass('catalog-nav__item--active');
        $(this).parent().siblings().removeClass('catalog-nav__item--active');
      });
      $(document).on('click', '.catalog-subnav__header', function () {
        $(this).parent().toggleClass('catalog-subnav__block--active');
        $(this).parent().siblings().removeClass('catalog-subnav__block--active');
      });
    }
  }; // var popupLink = function () {
  //   $('.js-popup-link').magnificPopup({
  //       showCloseBtn: false,
  //   });
  //     if($(window).width() < 1239) {
  //         $('.js-popup-link').magnificPopup({
  //             showCloseBtn: false,
  //             callbacks: {
  //                 open: function () {
  //                     $('html').addClass('fixed');
  //                 },
  //                 close: function () {
  //                     $('html').removeClass('fixed');
  //                 }
  //             }
  //         });
  //     }
  //
  //   $(document).on('click','.popup__close', function () {
  //       $.magnificPopup.close()
  //   })
  // };


  var popupLink = function popupLink() {
    $('.js-popup-link').magnificPopup({
      showCloseBtn: false,
      fixedContentPos: true,
      callbacks: {
        beforeOpen: function beforeOpen() {
          var top = $(window).scrollTop();
          $('body').css('position', 'fixed');
          $('body').css('top', -top);
          $('body').css('right', 0);
          $('body').css('left', 0);
          $('.js-product-photo-slider-main').slick('refresh');
          $('.js-product-photo-slider-aside').slick('refresh');
          $('.js-product-photo-slider-description').slick('refresh');
          var oneClick = $('#popup-buy-in-one-click');

          if (oneClick) {
            var objOneClick = {
              price: $('.product-count__price-number').text(),
              quantity: $('.js-element-quantity').val(),
              photo: $('.product-slider-main__item.slick-active img').attr('src')
            };
            oneClick.find('.js-oneclick-price').text(objOneClick.price);
            oneClick.find('.js-oneclick-quantity').text(objOneClick.quantity);
            oneClick.find('.js-oneclick-img').attr('src', objOneClick.photo);
          }
        },
        close: function close() {
          $('body').css('position', 'static');
          $('body').css('top', 'auto');
          $('body').css('right', 'auto');
          $('body').css('left', 'auto');
        }
      }
    });
    $(document).on('click', '.popup__close', function () {
      $.magnificPopup.close();
    });
  };

  var formValidate = function formValidate() {
    $('form').each(function () {
      $(this).on('submit', function () {
        $(this).validate({
          rules: {
            name: 'required',
            phone: 'required',
            password: 'required',
            "req-textarea": 'required'
          },
          messages: {
            name: 'Введите корректное имя',
            phone: 'Введите корректный номер',
            password: 'Введите корректный пароль',
            "req-textarea": 'Заполните поле'
          },
          errorPlacement: function errorPlacement(error, element) {
            element.attr("placeholder", error[0].outerText);
          }
        });

        if ($(this).valid()) {
          var wrap = $(this)[0].closest('.hide-on-success');

          if (wrap) {
            $(wrap).siblings('.show-on-success').show();
            $(wrap).hide();
          }
        }

        return false;
      });
    });
  };

  var reviewLine = function reviewLine() {
    $(document).on('click', '.review-line__number', function () {
      var left = $(this).parent().position().left;
      $(this).parent().siblings().removeClass('review-line__item--active');
      $(this).parent().addClass('review-line__item--active');
      $('.review-line').css('width', left - 1);
    });
  };

  var simpleBar = function simpleBar() {
    if ($(window).width() > 1239) {
      $.each($('.catalog-subnav'), function (i, v) {
        new SimpleBar(v);
      });
    }
  };

  var fileupload = function fileupload() {
    $(".file-upload input[type=file]").change(function () {
      var filename = $(this).val().replace(/.*\\/, "");
      $(this).closest('.file-upload').find('.file-upload__text').html(filename);
    });
  };

  var searchMobile = function searchMobile() {
    if ($(window).width() < 1239) {
      $(document).on('click', '.search__icon-mobile', function () {
        if ($(window).width() < 768) {
          if ($('.mobile-nav__wrapper').hasClass('mobile-nav__wrapper--active')) {
            $('.mobile-nav__wrapper').removeClass('mobile-nav__wrapper--active');
            $('.sandwich').removeClass('sandwich--active');
            $('.search').toggleClass('search-mobile--active');
            $('body').toggleClass('fixed');
          } else {
            if ($('.catalog-nav').hasClass('catalog-nav--active')) {
              $('.catalog-nav').removeClass('catalog-nav--active');
              $('body').toggleClass('fixed');
              $('.search').toggleClass('search-mobile--active');
            } else {
              $('.search').toggleClass('search-mobile--active');
            }
          }
        } else {
          $('.search').toggleClass('search-mobile--active');
        }
      });
    }
  };

  var searchInput = function searchInput() {
    $('.search__input').keyup(function () {
      if ($(this).val().length > 2) {
        $(this).closest('.search__form').addClass('search__form--active');
      } else {
        $(this).closest('.search__form').removeClass('search__form--active');
      }
    });
  };

  var breadcrumbsNav = function breadcrumbsNav() {
    $(document).on('click', '.breadcrumbs-nav__toggle', function () {
      $(this).parent().toggleClass('breadcrumbs__item--show-nav');
    });
  };

  var catalogMobileNav = function catalogMobileNav() {
    $(document).on('click', '.catalog-mobile-nav__label', function () {
      $(this).parent().toggleClass('catalog-mobile-nav__item--active');
      $(this).parent().siblings().removeClass('catalog-mobile-nav__item--active');
    });
  };

  sandwich();
  popularCategoriesSlider();
  productPrevSlider();
  catalogNav();
  popupLink();
  formValidate();
  reviewLine();
  simpleBar();
  fileupload();
  searchMobile();
  searchInput();
  breadcrumbsNav();
  catalogMobileNav();
});

var popularCategoriesSlider = function popularCategoriesSlider() {
  var sliderElement = $('.js-categories-prev');

  if ($(window).width() < 768 && !sliderElement.hasClass('slick-initialized')) {
    $('.js-categories-prev').slick({
      slidesToShow: 2,
      slidesToScroll: 1
    });
  } else if ($(window).width() > 768 && sliderElement.hasClass('slick-initialized')) {
    sliderElement.slick('unslick');
  }
};

$(window).on('resize', function () {
  popularCategoriesSlider();
});
$(window).on('load', function () {
  $(".sk-chase").fadeOut();
  $(".preloader").delay(400).fadeOut("slow");
  $("html").removeClass("fixed");
});