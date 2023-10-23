import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { searchCats, fetchCatByBreed } from './cat-api.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elem = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  err: document.querySelector('.error'),
  catImg: document.querySelector('.cat-info'),
};

elem.loader.style.display = 'none';
elem.err.style.display = 'none';
elem.select.style.display = 'none';
elem.catImg.style.display = 'none';

Loading.dots({
  svgColor: '#5897fb',
  svgSize: '130px',
  messageFontSize: '30px',
});

searchCats()
  .then(data => {
    elem.select.style.display = 'flex';
    elem.loader.style.display = 'none';

    createMarkup(data);
    new selectName({
      select: elem.select,
    });
  })
  .catch(err => {
    Notify.failure(elem.err.textContent);
  })
  .finally(result => Loading.remove());

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => {
      console.log({ id, name });
      const options = `<option value=${id}>${name}</option>`;
      elem.select.insertAdjacentHTML('beforeend', options);
    })
    .join('');
}
elem.select.addEventListener('change', e => {
  const id = e.target.value;

  Loading.dots({
    svgColor: '#5897fb',
    svgSize: '130px',
    messageFontSize: '30px',
  });

  fetchCatByBreed(id)
    .then(catInfo => {
      elem.catImg.style.display = 'flex';
      createMarkupImg(catInfo);
    })
    .catch(err => {
      Notify.failure(elem.err.textContent);
      elem.catImg.innerHTML = '';
    })
    .finally(result => Loading.remove());
});
function createMarkupImg(data) {
  const { url, breeds } = data;
  if (breeds.length > 0) {
    const { name, description, temperament } = breeds[0];

    elem.catImg.innerHTML = `
      <img class="cat-img" src="${url}" alt="${name}"  >
       <div class="cat-right">
      <h1 class="name">${name}</h1>
      <p class="description">${description}</p>
      <p class="temperament"><span class="temperament-span">Temperament:</span> ${temperament}</p>
      </div>`;
  }
}
