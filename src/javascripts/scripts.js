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

window.addEventListener('load', () => {
  const time = 'Aug 31, 2019 23:00:00';
  countdownToTime(time);

  handleClickOnFaq();

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
