export { onLoadMoreBtn };

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
