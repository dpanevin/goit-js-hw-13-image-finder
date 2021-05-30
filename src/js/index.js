import galleryCardTpl from '../templates/gallery.hbs'
import ImagesApi from './imagesApi.js'
import debounce from 'lodash.debounce';

const imagesApi = new ImagesApi();
const refs = {
    inputEl: document.querySelector('[name="query"]'),
    galleryEl: document.querySelector('.gallery'),
    observerEl: document.querySelector('.js-observer')
}
const observerOptions = {
    marginrootMargin: '-300px'
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
        console.log(entry.isIntersecting);
        console.log(imagesApi.query)
        if (entry.isIntersecting && imagesApi.query !== '') {

            console.log('sdfsdf')
            const response = await imagesApi.fetchImages();
            const images = response.hits;
    
            markupMaker(images);
            imagesApi.incrementPage();
        }
    })
}, observerOptions)

observer.observe(refs.observerEl);

refs.inputEl.addEventListener('input', debounce(onSearchQuery, 500))

async function onSearchQuery(e) {
    if (e.target.value === '' || e.target.value === ' ') {
        imagesApi.query = e.target.value;
        refs.galleryEl.innerHTML = '';
        return;
    } else if (e.target.value !== imagesApi.query) {
        imagesApi.query = e.target.value;
        refs.galleryEl.innerHTML = '';
    }
    imagesApi.query = e.target.value;
    await imagesApi.resetPage();
    const response = await imagesApi.fetchImages();
    const images = response.hits;
    
    markupMaker(images);
    imagesApi.incrementPage();
}

function markupMaker(images) {
    const markup = galleryCardTpl(images);
    refs.galleryEl.insertAdjacentHTML('beforeend', markup)
}

