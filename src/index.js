import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImage } from './image-fetch';
import { render } from './image-render';
// import { onLoadMoreBtn } from './image-load-more';
import {
  alertTryAgain,
  warningEndOfSearch,
  successAnswer,
  failureEmptyString,
} from './image-alerts';

const refs = {
  searchForm: document.querySelector('#search-form'),
  btnSearch: document.querySelector('.search-btn'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

let simpleLightBox;
let page = 1;
let query = '';
const limit = 40;

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
refs.loadMoreBtn.classList.add('is-hidden');

function onSearchForm(event) {
  event.preventDefault();

  query = event.currentTarget.searchQuery.value.trim();

  let page = 1;

  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');

  if (query === '') {
    failureEmptyString();
    return;
  }
  fetchImage(query, page, limit)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        alertTryAgain();
      } else if (data.hits > limit) {
        refs.loadMoreBtn.classList.remove('is-hidden');
      } else {
        refs.gallery.insertAdjacentHTML('beforeend', render(data.hits));
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        successAnswer(data.totalHits);
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.searchForm.reset();
    });
}

function onLoadMoreBtn(event) {
  event.preventDefault();

  page += 1;
  simpleLightBox.destroy();

  refs.loadMoreBtn.classList.remove('is-hidden');

  fetchImage(query, page, limit)
    .then(({ data }) => {
      refs.gallery.insertAdjacentHTML('beforeend', render(data.hits));
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalNumberImages = Math.ceil(data.hits / limit);

      if (page > totalNumberImages) {
        warningEndOfSearch();

        refs.loadMoreBtn.classList.add('is-hidden');
      }
    })
    .catch(error => console.log(error));
}
