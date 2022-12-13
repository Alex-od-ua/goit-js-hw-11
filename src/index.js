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

async function onSearchForm(event) {
  event.preventDefault();

  query = event.currentTarget.searchQuery.value.trim();

  let page = 1;

  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');

  if (query === '') {
    failureEmptyString();
    return;
  }

  const response = await fetchImage(query, page, limit);

  if (response.totalHits > limit) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  } else {
    refs.loadMoreBtn.classList.add('is-hidden');
  }

  try {
    if (response.totalHits === 0) {
      alertTryAgain();
      refs.searchForm.reset();
    } else {
      refs.gallery.insertAdjacentHTML('beforeend', render(response.hits));
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      successAnswer(response.totalHits);
      refs.searchForm.reset();
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function onLoadMoreBtn(event) {
  event.preventDefault();

  page += 1;

  refs.loadMoreBtn.classList.remove('is-hidden');

  const response = await fetchImage(query, page, limit);
  try {
    refs.gallery.insertAdjacentHTML('beforeend', render(response.hits));
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();

    const totalNumberImages = response.totalHits / limit;

    if (page > totalNumberImages) {
      warningEndOfSearch();

      refs.loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error.message);
  }
}
