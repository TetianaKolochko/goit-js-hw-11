import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {    
    gallery: document.querySelector('.gallery')    
};

let gallery = new SimpleLightbox('.gallery a');

export function appendHitsMarkup({hits}) {
  console.log(hits);
  const markup = hits.map((picture) => `<div class="photo-card">
    <a class="gallery__item" href="${picture.largeImageURL}">
  <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" width="300" height="200"/>
  <div class="info">
    <p class="info-item">
      <b>Likes ${picture.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${picture.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${picture.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${picture.downloads}</b>
    </p>
  </div>
</div></a>`).join("");
  
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  
  gallery.refresh()
}

