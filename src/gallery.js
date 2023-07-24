import { Notify } from 'notiflix';
import { getImage } from './api';
const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

export function createImageCard(imageData) {
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const {
    largeImageURL,
    tags,
    webformatURL,
    likes,
    views,
    comments,
    downloads,
  } = imageData;

  card.innerHTML = `
    <a href="${largeImageURL}" data-lightbox="gallery" data-title="${tags}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item"><b>Likes:</b> ${likes}</p>
      <p class="info-item"><b>Views:</b> ${views}</p>
      <p class="info-item"><b>Comments:</b> ${comments}</p>
      <p class="info-item"><b>Downloads:</b> ${downloads}</p>
    </div>
  `;

  return card;
}

export function displayImages(data) {
  const images = data.hits.map(createImageCard);
  galleryEl.append(...images);

  const lastCard = galleryEl.lastElementChild;
  if (lastCard) {
    lastCard.scrollIntoView({ behavior: 'smooth', block: 'end' });

    const { height: cardHeight } =
      galleryEl.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoadMoreBtn() {
  btnLoadMore.style.display = 'block';
}

export function hideLoadMoreBtn() {
  btnLoadMore.style.display = 'none';
}

export function showNoResultsMessage() {
  Notify.warning(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
