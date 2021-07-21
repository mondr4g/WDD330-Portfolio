import Movies from './movies.js';

const m = new Movies();

const form = document.getElementById('search-movie');
const searchbar = document.getElementById('search'); 
const favorites = document.getElementById('fav');
const catalog = document.getElementById('all');

window.addEventListener('load', () => {
    // console.log("loading movies");
    m.getMostPopular();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const movie = searchbar.value;
    // selectedGenre=[];
    // setGenre();
    if(movie) {
        m.getMovie(movie)
    }
    else {
        m.getMostPopular();
    }
})

favorites.addEventListener('click', (e) => {
    m.getFavorites();
})

catalog.addEventListener('click', (e) => {
    m.getMostPopular();
})






