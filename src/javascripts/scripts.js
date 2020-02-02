import Swiper from 'swiper';

const DATE_PROMOTION = 'Dec 31, 2020 23:00:00'; // set date for timer;
const DATE_WEBINAR = 'Feb 20, 2020, 23:00:00'; // set date for timer;

function countdownToTime(time) {
  const elCounter = document.querySelector('.counter');
  const elDay = document.querySelector('.counter__day');
  const elHour = document.querySelector('.counter__hour');
  const elMinute = document.querySelector('.counter__minute');
  const elSecond = document.querySelector('.counter__second');

  let interval;
  const updateTimer = () => {
    const countTo = new Date(time).getTime();
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(countTo)) {
      clearInterval(interval);
      throw Error('Incorrect date format');
    }
    const now = new Date().getTime();
    const diff = countTo - now;

    if (diff < 0) {
      elCounter.innerHTML = '<div class="counter__end">Promocja została zakończona</div>';
      clearInterval(interval);
    }
    const msPerDay = 60 * 60 * 1000 * 24;
    const msPerHour = 60 * 60 * 1000;
    const days = Math.floor(diff / msPerDay);
    const hours = Math.floor((diff % msPerDay) / msPerHour);
    const mins = Math.floor(((diff % msPerDay) % msPerHour) / (60 * 1000));
    const secs = Math.floor((((diff % msPerDay) % msPerHour) % (60 * 1000)) / 1000);

    elDay.innerHTML = days;
    elHour.innerHTML = hours;
    elMinute.innerHTML = mins;
    elSecond.innerHTML = secs;
  };

  interval = setInterval(updateTimer, 1000);
}

function handleClickOnFaq() {
  const faq = document.querySelector('.faq');
  if (!faq) return;
  faq.addEventListener('click', (e) => {
    if (e.target.classList.contains('faq__term')) {
      e.target.classList.toggle('open');
    }
  });
}

function renderModalContent(ref) {
  return ref === 'webinar'
    ? `<div class="modal__box">
          <img
            srcset="./images/www1.png,
            ./images/www1@2x.png 2x""
            src="./images/www1.png"
            alt="modal image"
            class="modal__image">
          <h1 class="modal__header">Dziękujemy za zapisanie się <br/>na webinar!</h1>
          <p class="modal__text">Na maila {xyz} wysyłamy właśnie <br/>potwierdzenie zapisania się.</p>
          <div class="modal__close"></div>
        </div>
      ` : `
      <div class="modal__box">
        <h1 class="modal__header">Dziękujemy za zamówienie!</h1>
        <p class="modal__text">Formularz został wysłany poprawnie!</p>
        <div class="modal__close"></div>
      </div>
      `;
}

function renderModal(status, ref) {
  const modal = document.createElement('div');
  modal.classList.add('modal__cover');
  if (ref === 'webinar') {
    modal.classList.add('webinar');
  }
  modal.innerHTML = renderModalContent(ref);

  if (status) {
    document.body.append(modal);
  } else {
    document.querySelector('.modal__cover').remove();
  }
}

function handleFormSubmit() {
  let isModalOpen = false;
  const form = document.querySelector('.form');
  if (!form) return;
  const submitBtn = form.querySelector('[type="submit"]');

  submitBtn.addEventListener('click', () => {
    form.classList.add('dirty');
  });

  form.addEventListener('submit', (e) => {
    if (!isModalOpen) {
      const reference = form.dataset && form.dataset.reference;
      renderModal(true, reference);
      document.querySelector('.modal__close').addEventListener('click', () => renderModal(false));
    }

    isModalOpen = true;

    if (!window.localStorage) return;
    if (window.localStorage.getItem('form_submitted') === 'true') {
      e.preventDefault();
    } else {
      window.localStorage.setItem('form_submitted', true);
      submitBtn.disabled = true;
    }
  });
}

function handleMenuClick() {
  const menu = document.querySelector('.navigation__icon');
  const menuBtn = document.querySelector('.navigation__menu');
  if (menu) {
    menu.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
  }

  const menuLinks = document.querySelectorAll('.navigation--mobile .navigation__container a');
  if (menuLinks) {
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        document.body.classList.toggle('menu-open');
      });
    });
  }
}

window.addEventListener('load', () => {
  const mainElement = document.querySelector('main');
  let time = DATE_PROMOTION;
  if (mainElement.classList.contains('webinar')) {
    time = DATE_WEBINAR;
  }
  const numberOfSliderLogos = document.body.offsetWidth < 1025 ? 2 : 4;
  countdownToTime(time);

  handleClickOnFaq();

  handleFormSubmit();

  handleMenuClick();

  // eslint-disable-next-line
  const customSwiper = new Swiper('.slider', {
    pagination: {
      el: '.slider-pagination',
      clickable: true,
    },
  });
  // eslint-disable-next-line
  const logosSwiper = new Swiper('.logos', {
    slidesPerView: numberOfSliderLogos,
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });
});
