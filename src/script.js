import Map from './map.js';

const body = document.querySelector('body');

const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

const hiddenMenuToggle = document.getElementById('hamburger__toggle');
const btnHiddenMenu = document.querySelector('.hamburger__menu');
const hiddenMenu = document.querySelector('.menu__hidden');
const hiddenMenuLinks = document.querySelectorAll('.menu__link');

const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnsCloseModal = document.querySelectorAll('.btn--close-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const showHiddenMenu = function () {
    header.classList.add('shadow');
    nav.classList.add('color');
  }

const closeHiddenMenu = function () {
  header.classList.remove('shadow');
  nav.classList.remove('color');
}

const hiddenMenuHandler = function (){
  if(!(header.classList.contains('shadow'))){
    body.classList.add('locked');
    showHiddenMenu();
  } else {
    closeHiddenMenu();
    body.classList.remove('locked');
  }
}

// Hidden menu
hiddenMenuToggle.addEventListener('change', hiddenMenuHandler);

// Hidden menu links
hiddenMenuLinks.forEach(function (link){
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const id = this.getAttribute('href');
    
    hiddenMenuToggle.checked = false;
    header.classList.remove('shadow');
    nav.classList.remove('color');
    body.classList.remove('locked');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
});

// Nav Sticky
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting){
    nav.classList.add('sticky');
    hiddenMenuToggle.classList.add('sticky');
    hiddenMenu.classList.add('sticky');
    btnHiddenMenu.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Nav links
navLinks.forEach(function (link){
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    if (id === '#') return;
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
});

// Header button "Serviço jurídico especializado" 
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Slider Avaliações
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// Map
const map = new Map();

// Modal Window
const openModal = function (e) { e.preventDefault(); modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');

  if(nav.classList.contains('color'))
  header.classList.add('shadow');
}

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnsCloseModal.forEach(btn => btn.addEventListener('click', closeModal));
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if(e.key === 'Escape' && !modal.classList.contains('hidden')){
    closeModal();
  }
});

// Page Reload
document.addEventListener('DOMContentLoaded', function (){
  closeModal();
  closeHiddenMenu();
  hiddenMenuToggle.checked = false;
});


// Display Cookies
