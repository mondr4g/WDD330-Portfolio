import Movies from './movies.js';

const m = new Movies();
const cat = Array.from(document.getElementById('subnav').children);

window.addEventListener('load', () => {
    // console.log("loading movies");
    m.getMostPopular();

    cat.forEach(c => {
        c.addEventListener('click', e => {
            m.getCatMovies(c.id);
        })
    })
});

// Search Movie
document.getElementById('search-movie').addEventListener('submit', (e) => {
    e.preventDefault();
    const movie = document.getElementById('search').value;
    // selectedGenre=[];
    // setGenre();
    if(movie) {
        m.getMovie(movie)
    }
    else {
        m.getMostPopular();
    }
})

// Show all Movies
document.getElementById('fav').addEventListener('click', (e) => {
    m.getFavorites();
})

// Show Favorite Movies
document.getElementById('all').addEventListener('click', (e) => {
    m.getMostPopular();
})

// // Show Kids Movies
// document.getElementById('kids').addEventListener('click', (e) => {
//     m.getKids();
// })












