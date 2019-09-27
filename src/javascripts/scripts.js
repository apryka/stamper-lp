import Swiper from 'swiper';

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
  faq.addEventListener('click', (e) => {
    if (e.target.classList.contains('faq__term')) {
      e.target.classList.toggle('open');
    }
  });
}

function renderModal(status) {
  const modalContent = `
  <div class="modal__box">
    <h1 class="modal__header">Dziękujemy za zamówienie!</h1>
    <p class="modal__text">Formularz został wysłany poprawnie!</p>
    <div class="modal__close"></div>
  </div>
  `;
  const modal = document.createElement('div');
  modal.classList.add('modal__cover');
  modal.innerHTML = modalContent;

  if (status) {
    document.body.append(modal);
  } else {
    document.querySelector('.modal__cover').remove();
  }
}

function handleFormSubmit() {
  const form = document.querySelector('.form');
  const submitBtn = form.querySelector('[type="submit"]');

  submitBtn.addEventListener('click', () => {
    form.classList.add('dirty');
  });

  form.addEventListener('submit', (e) => {
    renderModal(true);
    document.querySelector('.modal__close').addEventListener('click', () => renderModal(false));

    if (!window.localStorage) return;
    if (window.localStorage.getItem('form_submitted') === 'true') {
      e.preventDefault();
    } else {
      window.localStorage.setItem('form_submitted', true);
      submitBtn.disabled = true;
    }
  });
}

window.addEventListener('load', () => {
  const time = 'Aug 31, 2019 23:00:00'; // set time for counter

  countdownToTime(time);

  handleClickOnFaq();

  handleFormSubmit();

  // eslint-disable-next-line
  const customSwiper = new Swiper('.slider', {
    pagination: {
      el: '.slider-pagination',
      clickable: true,
    },
  });
  // eslint-disable-next-line
  const logosSwiper = new Swiper('.logos', {
    slidesPerView: 4,
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });
});
