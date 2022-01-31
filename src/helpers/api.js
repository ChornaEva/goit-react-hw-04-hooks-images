const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24369719-4937f00e9b76df3c43c2e5aa7';

function fetchImages(searchImage, page) {
  return fetch(
    `${BASE_URL}?q=${searchImage}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}

export default fetchImages;
