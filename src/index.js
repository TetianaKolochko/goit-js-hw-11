import './sass/main.scss';
import Notiflix from 'notiflix';

import API from './fetch-pictures';
import { appendHitsMarkup } from './markup-of-pictures';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};
const api = new API();
let numberOfPictures = null;

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

hideLoadMoreBtn();

function onSearch(e) {
    e.preventDefault();    
    
    api.query = e.currentTarget.elements.searchQuery.value.trim();

  if (api.query === "") {
    Notiflix.Notify.warning('Please fill in the field');
    return;
  }    
    api.resetPage();
    api.fetchPictures().then(hits => {
        clearHitsContainer();
        appendHitsMarkup(hits)
        showLoadMoreBtn();
      
      numberOfPictures = hits.hits.length; 
      if (hits.hits.length === 0) {
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        hideLoadMoreBtn();
        return
      }
    Notiflix.Notify.success(`Hooray! We found ${hits.totalHits} images.`);
    });
};

function onLoadMore() {   
    hideLoadMoreBtn();
    api.fetchPictures().then(hits => {
        appendHitsMarkup(hits)
        showLoadMoreBtn();

      numberOfPictures += hits.hits.length;
           
      if (numberOfPictures === hits.totalHits) {        
        Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
        hideLoadMoreBtn();
        return
      }
    });
}

function hideLoadMoreBtn() {
    refs.loadMoreBtn.classList.add("is-hidden");
}

function showLoadMoreBtn() {
    refs.loadMoreBtn.classList.remove("is-hidden");
}

function clearHitsContainer() {
    refs.gallery.innerHTML = '';
}



    