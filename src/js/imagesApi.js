const BASE_URL = 'https://pixabay.com/api'
const API_KEY = '21824678-226458aab3f184645846eee2a';

export default class ImagesApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=12&page=${this.page}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const images = response.json();
            return images;
        } catch (error) {
            console.log(error)
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}