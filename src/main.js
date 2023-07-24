import { Notify } from 'notiflix';
import { getImage } from './api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  displayImages,
  clearGallery,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  showEndOfResultsMessage,
} from './gallery';

const formEl = document.querySelector('#search-form');
const btnLoadMore = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');

formEl.addEventListener('submit', onFormElSubmit);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

let currentPage = 1;
let currentQuery = '';

export async function onFormElSubmit(ev) {
  ev.preventDefault();
  const query = formEl.elements.searchQuery.value.trim();

  if (query === '') {
    Notify.failure('Please, enter what you want to find.');
    return;
  }

  clearGallery();
  currentPage = 1;
  currentQuery = query;

  try {
    const data = await getImage(query, currentPage);

    if (!data || data.hits.length === 0) {
      showNoResultsMessage();
      hideLoadMoreBtn();
      return;
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    displayImages(data);
    lightbox.refresh();

    if (data.totalHits > data.hits.length) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    Notify.failure('Error fetching images. Please try again later.');
  }
}

export async function onBtnLoadMoreClick() {
  currentPage += 1;
  const data = await getImage(currentQuery, currentPage);

  if (data && data.hits.length > 0) {
    displayImages(data);

    if (data.totalHits <= currentPage * 40) {
      hideLoadMoreBtn();
    }
  } else {
    showEndOfResultsMessage();
    hideLoadMoreBtn();
  }
}

export function showEndOfResultsMessage() {
  Notify.info("We're sorry, but you've reached the end of the search results.");
}
