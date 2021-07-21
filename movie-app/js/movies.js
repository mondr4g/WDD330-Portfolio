import * as movieLS from './movieLS.js';
import * as cat from './categories.js';

// TMDB API
const KEY = 'api_key=1703cae1870e7130d55e3e8da1ad67e3';
const URL = 'https://api.themoviedb.org/3';

// HTML ELEMENTS
const main = document.getElementById('main-content');

var favorites = [];

export default class Movies {
    constructor() {
        this.urlPopular = URL + '/discover/movie?sort_by=popularity.desc&' + KEY;
        this.bestOfYear = URL + '/discover/movie?primary_release_year=2021&sort_by=vote_average.desc&' + KEY;
        this.urlCat = URL + '/discover/movie?with_genres=';
        this.urlIMG = 'https://image.tmdb.org/t/p/w500';
        this.urlSearchMovie = URL + '/search/movie?'+ KEY; 
    }

    getMostPopular() {
        fetch(this.urlPopular).then(res => res.json()).then(data => {
            this.showLastMovies(data.results);
        })
    }

    getMovie(movie) {
        fetch(this.urlSearchMovie+'&query='+movie).then(res => res.json()).then(data => {
            console.log(data.results)
            if(data.results.length === 0){
                console.log('0 results');
                let msg =  'No results for ' + movie + ' on the catalog';
                showError(msg);

            }
            else
                this.showLastMovies(data.results);
        })
    }

    getFavorites() {
        if(favorites.length === 0){
            console.log('0 results');
            showError('No movies added to favorites yet!!');
        }
        else
            this.showLastMovies(favorites);
    }

    getCatMovies(cat) {
        // console.log(cat)
        let c = cat.split('-');
        // console.log(c)
        fetch(this.urlCat+c+'&'+KEY).then(res => res.json()).then(data => {
            this.showLastMovies(data.results);
        })       
    }

    showLastMovies(data) {
        main.innerHTML = '';
    
        data.forEach(e => {
            const {title, poster_path, vote_average, overview, id} = e;
            const m = document.createElement('div');
            m.classList.add('movie');
            m.classList.add('card');
            // <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            m.innerHTML = `
                <i class="fas fa-heart" id="${id}"></i>
                <img src="${poster_path? this.urlIMG+poster_path: "http://via.placeholder.com/1080x1580" }" class="m-img card-img-top">
                <div class="m-info card-body">
                    <h2 class="m-title card-text">${title}</h2>
                    <span class="m-rate ${getColor(vote_average)}">${vote_average} <i class="fas fa-star"></i></span>
                </div>
                <div class="m-desc card-text">
                    <h2>${title}</h2>
                    <p>${overview}</p>
                    <br/> 
                </div>
            `
            main.appendChild(m);
    
            // Add event listener for favorites
            let heart = document.getElementById(id);
            
            if(movieLS.readFromLS(id)) {
                heart.style.color = '#ff0054';
            }

            document.getElementById(id).addEventListener('click', () => {
                let color = window.getComputedStyle( heart, null).getPropertyValue('color');  
                console.log(color)
                if(color == 'rgb(36, 36, 35)') {
                    // New Favorite
                    heart.style.color = '#ff0054';
                    this.addMovie(id, e)
                }
                else if(color == 'rgb(255, 0, 84)') {
                    // Out of Favorites
                    heart.style.color = '#242423'; 
                    this.removeMovie(id);
                }
            })
        })
    }

    addMovie(id, data) {
        console.log(data);
        favorites.push(data);
        movieLS.writeToLS(id, data);
    }

    removeMovie(id) {
        let m = favorites.findIndex(m => m.id == id);
        favorites.splice(m, 1);
        movieLS.removeFromLS(id);
    }
}

function getColor(vote) {
    if(vote >= 8){
        return 'g';
    }else if(vote >= 5){
        return "o";
    }else{
        return 'r';
    }
}

function showError(text) {
    console.log('no movie')
    main.innerHTML = '';
    const msg = document.createElement('div');
    msg.classList.add('m-error');
    msg.innerHTML = `
        <p><i class="fas fa-exclamation-circle"></i> ${text}.<p>    
    `
    main.appendChild(msg);
}
