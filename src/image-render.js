export { render };

function render(images) {
  const markup = images
    .map(image => {
      return `<a class="image-link" href="${image.largeImageURL}"><div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" width= 300px min-height = 150px loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${image.likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${image.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${image.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${image.downloads}</b>
          </p>
        </div>
      </div></a>`;
    })
    .join('');

  return markup;
}
