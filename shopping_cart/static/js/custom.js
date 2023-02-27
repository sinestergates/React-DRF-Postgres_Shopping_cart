
const button = document.querySelector('#submit');
const form = document.querySelector('#blablabla');
const popup = document.querySelector('.popup');


button.addEventListener('click', () => {

  form.classList.add('open');
  popup.classList.add('open');


});