import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38404323-bfc4a89d563bd7bb6d8a9c299';

export async function getImage(query, page) {
  const queryParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: `${page}`,
    per_page: '40',
  });

  const { data } = await axios.get(`${BASE_URL}?${queryParams}`);
  return data;
}
