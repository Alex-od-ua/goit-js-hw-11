import axios from 'axios';
export { fetchImage };

const BASE_URL = 'https://pixabay.com/api/';

const KEY = '31939981-403d02160b0621624e665fa7a';

async function fetchImage(q, page, perPage) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );

  return response.data;
}
