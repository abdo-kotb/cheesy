'use strict';

const year = document.getElementById('year');

const navLinks = document.querySelector('.navbar-nav');

const header = document.querySelector('.header');
const nav = document.querySelector('.navbar');

const featuresContainer = document.querySelector('.section-features .row');
const todaySec = document.querySelector('.today .row');

const hiddenSecs = document.querySelectorAll('.section-hidden');

const lazyImgs = document.querySelectorAll('[data-src]');

const reservSec = document.querySelector('.reservations');
const reservebtn = reservSec.querySelector('.btn');

/////////////////////////////////////
// Setting the date year
year.textContent = new Date().getFullYear();

/////////////////////////////////////
// page navigation

navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  if (!e.target.classList.contains('nav-link')) return;

  const id = e.target.getAttribute('href');

  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////
// sticky navigation

const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      nav.classList.add('fixed-top');
      nav.style.backgroundColor = 'rgb(96 108 56 / 95%)';
      entry.target.style.zIndex = 'unset';
      nav.querySelector('.nav-item.btn').classList.add('reserve-btn');
    } else {
      nav.classList.remove('fixed-top');
      nav.style.backgroundColor = 'unset';
      entry.target.style.zIndex = 0;
      nav.querySelector('.nav-item.btn').classList.remove('reserve-btn');
    }
  },
  {
    rootMargin: `-${navHeight}px`,
  }
);

headerObserver.observe(header);

/////////////////////////////////////
// features section

const bouncingObserver = new IntersectionObserver(function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting)
    entry.target
      .querySelectorAll('.bounce')
      .forEach(el => el.classList.add('bounce-none'));
  else
    entry.target
      .querySelectorAll('.bounce')
      .forEach(el => el.classList.remove('bounce-none'));
});

bouncingObserver.observe(featuresContainer);
bouncingObserver.observe(todaySec);

/////////////////////////////////////
// price counter

const mealSection1 = document.getElementById('main-course');
const mealSection2 = document.querySelector('.chef-menu');

const startCount = function (el) {
  let { price } = el.dataset;
  let goal = 0;
  let count = setInterval(function () {
    goal++;
    el.innerHTML = `&dollar; ${goal}`;
    if (price == goal) {
      clearInterval(count);
      el.className = 'pulse';
    }
  }, 2000 / price);
};

const pricesObserver = new IntersectionObserver(function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting)
    entry.target
      .querySelectorAll('.price span')
      .forEach(price => startCount(price));
});

pricesObserver.observe(mealSection1);
pricesObserver.observe(mealSection2);

/////////////////////////////////////
// Reveal sections

const sectionObserver = new IntersectionObserver(function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) entry.target.classList.remove('section-hidden');
  else entry.target.classList.add('section-hidden');
});

hiddenSecs.forEach(sec => sectionObserver.observe(sec));

/////////////////////////////////////
// Reveal images

const loadImgs = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    this.classList.remove('blur');
  });

  observer.unobserve(entry.target);
};

const imgsObserver = new IntersectionObserver(loadImgs);

lazyImgs.forEach(img => imgsObserver.observe(img));

//////////////////////////////////////
// effect on reservation section

const reservationObserver = new IntersectionObserver(function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) reservebtn.classList.add('pulse');
  else reservebtn.classList.remove('pulse');
});

reservationObserver.observe(reservSec);

/*
    Carousel
*/
$('#carousel-example').on('slide.bs.carousel', function (e) {
  /*
      CC 2.0 License Iatek LLC 2018
  */
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 4;
  var totalItems = $('.carousel-item').length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);
    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == 'left') {
        $('.carousel-item').eq(i).appendTo('.carousel-inner');
      } else {
        $('.carousel-item').eq(0).appendTo('.carousel-inner');
      }
    }
  }
});
