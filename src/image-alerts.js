export { alertTryAgain, warningEndOfSearch, successAnswer, failureEmptyString };

import Notiflix from 'notiflix';

function alertTryAgain() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function warningEndOfSearch() {
  Notiflix.Notify.warning(
    "We're sorry, but you've reached the end of search results."
  );
}

function successAnswer(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
}

function failureEmptyString() {
  Notiflix.Notify.failure(
    'Please, enter a request. The string cannot be empty!'
  );
}
