// TMDB API
const KEY = 'api_key=1703cae1870e7130d55e3e8da1ad67e3';
const URL = 'https://api.themoviedb.org/3';

// HTML ELEMENTS
const main = document.getElementById('main-content');
const banner = document.getElementById('banner');

export default class Movies {
    constructor() {
        this.urlPopular = URL + '/discover/movie?sort_by=popularity.desc&' + KEY;
        this.bestOfYear = URL + '/discover/movie?primary_release_year=2021&sort_by=vote_average.desc&' + KEY;
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
                showError(movie);

            }
            else
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
            m.innerHTML = `
                 <img src="${this.urlIMG+poster_path}" alt="${title}" class="m-img card-img-top">
                <div class="m-info card-body">
                    <h2 class="m-title card-text">${title}</h2>
                    <span class="m-rate ${getColor(vote_average)}">${vote_average} <i class="fas fa-star"></i></span>
                </div>
                <div class="m-desc card-text">
                    <h2>Overview</h2>
                    <p>${overview}</p>
                    <br/> 
                    <button type="button" class="know-more btn btn-warning" id="${id}">Know More</button
                </div>
            
            `
    
            main.appendChild(m);
    
            // document.getElementById(id).addEventListener('click', () => {
            //   console.log(id)
            //   openNav(movie)
            // })
        })
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

function showError(movie) {
    console.log('no movie')
    main.innerHTML = '';
    const msg = document.createElement('div');
    msg.classList.add('m-error');
    msg.innerHTML = `
        <p><i class="fas fa-exclamation-circle"></i> No results for '${movie}' on the catalog.<p>    
    `
    main.appendChild(msg);
}


// const searchURL = BASE_URL + '/search/movie?'+API_KEY;

// const main = document.getElementById('main');
// const form =  document.getElementById('form');
// const search = document.getElementById('search');
// const tagsEl = document.getElementById('tags');

// const prev = document.getElementById('prev')
// const next = document.getElementById('next')
// const current = document.getElementById('current')

// var currentPage = 1;
// var nextPage = 2;
// var prevPage = 3;
// var lastUrl = '';
// var totalPages = 100;

// var selectedGenre = []
// setGenre();
// function setGenre() {
//     tagsEl.innerHTML= '';
//     genres.forEach(genre => {
//         const t = document.createElement('div');
//         t.classList.add('tag');
//         t.id=genre.id;
//         t.innerText = genre.name;
//         t.addEventListener('click', () => {
//             if(selectedGenre.length == 0){
//                 selectedGenre.push(genre.id);
//             }else{
//                 if(selectedGenre.includes(genre.id)){
//                     selectedGenre.forEach((id, idx) => {
//                         if(id == genre.id){
//                             selectedGenre.splice(idx, 1);
//                         }
//                     })
//                 }else{
//                     selectedGenre.push(genre.id);
//                 }
//             }
//             console.log(selectedGenre)
//             getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
//             highlightSelection()
//         })
//         tagsEl.append(t);
//     })
// }

// function highlightSelection() {
//     const tags = document.querySelectorAll('.tag');
//     tags.forEach(tag => {
//         tag.classList.remove('highlight')
//     })
//     clearBtn()
//     if(selectedGenre.length !=0){   
//         selectedGenre.forEach(id => {
//             const hightlightedTag = document.getElementById(id);
//             hightlightedTag.classList.add('highlight');
//         })
//     }

// }

// function clearBtn(){
//     let clearBtn = document.getElementById('clear');
//     if(clearBtn){
//         clearBtn.classList.add('highlight')
//     }else{
            
//         let clear = document.createElement('div');
//         clear.classList.add('tag','highlight');
//         clear.id = 'clear';
//         clear.innerText = 'Clear x';
//         clear.addEventListener('click', () => {
//             selectedGenre = [];
//             setGenre();            
//             getMovies(API_URL);
//         })
//         tagsEl.append(clear);
//     }
    
// }

// getMovies(API_URL);

// function getMovies(url) {
//   lastUrl = url;
//     fetch(url).then(res => res.json()).then(data => {
//         console.log(data.results)
//         if(data.results.length !== 0){
//             showMovies(data.results);
//             currentPage = data.page;
//             nextPage = currentPage + 1;
//             prevPage = currentPage - 1;
//             totalPages = data.total_pages;

//             current.innerText = currentPage;

//             if(currentPage <= 1){
//               prev.classList.add('disabled');
//               next.classList.remove('disabled')
//             }else if(currentPage>= totalPages){
//               prev.classList.remove('disabled');
//               next.classList.add('disabled')
//             }else{
//               prev.classList.remove('disabled');
//               next.classList.remove('disabled')
//             }

//             tagsEl.scrollIntoView({behavior : 'smooth'})

//         }else{
//             main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
//         }
       
//     })

// }




// const overlayContent = document.getElementById('overlay-content');
// /* Open when someone clicks on the span element */
// function openNav(movie) {
//   let id = movie.id;
//   fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => {
//     console.log(videoData);
//     if(videoData){
//       document.getElementById("myNav").style.width = "100%";
//       if(videoData.results.length > 0){
//         var embed = [];
//         var dots = [];
//         videoData.results.forEach((video, idx) => {
//           let {name, key, site} = video

//           if(site == 'YouTube'){
              
//             embed.push(`
//               <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
//           `)

//             dots.push(`
//               <span class="dot">${idx + 1}</span>
//             `)
//           }
//         })
        
//         var content = `
//         <h1 class="no-results">${movie.original_title}</h1>
//         <br/>
        
//         ${embed.join('')}
//         <br/>
//         <div class="dots">${dots.join('')}</div>
        
//         `
//         overlayContent.innerHTML = content;
//         activeSlide=0;
//         showVideos();
//       }else{
//         overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
//       }
//     }
//   })
// }

// /* Close when someone clicks on the "x" symbol inside the overlay */
// function closeNav() {
//   document.getElementById("myNav").style.width = "0%";
// }

// var activeSlide = 0;
// var totalVideos = 0;

// function showVideos(){
//   let embedClasses = document.querySelectorAll('.embed');
//   let dots = document.querySelectorAll('.dot');

//   totalVideos = embedClasses.length; 
//   embedClasses.forEach((embedTag, idx) => {
//     if(activeSlide == idx){
//       embedTag.classList.add('show')
//       embedTag.classList.remove('hide')

//     }else{
//       embedTag.classList.add('hide');
//       embedTag.classList.remove('show')
//     }
//   })

//   dots.forEach((dot, indx) => {
//     if(activeSlide == indx){
//       dot.classList.add('active');
//     }else{
//       dot.classList.remove('active')
//     }
//   })
// }

// const leftArrow = document.getElementById('left-arrow')
// const rightArrow = document.getElementById('right-arrow')

// leftArrow.addEventListener('click', () => {
//   if(activeSlide > 0){
//     activeSlide--;
//   }else{
//     activeSlide = totalVideos -1;
//   }

//   showVideos()
// })

// rightArrow.addEventListener('click', () => {
//   if(activeSlide < (totalVideos -1)){
//     activeSlide++;
//   }else{
//     activeSlide = 0;
//   }
//   showVideos()
// })


// function getColor(vote) {
//     if(vote>= 8){
//         return 'green'
//     }else if(vote >= 5){
//         return "orange"
//     }else{
//         return 'red'
//     }
// }

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const searchTerm = search.value;
//     selectedGenre=[];
//     setGenre();
//     if(searchTerm) {
//         getMovies(searchURL+'&query='+searchTerm)
//     }else{
//         getMovies(API_URL);
//     }

// })

// prev.addEventListener('click', () => {
//   if(prevPage > 0){
//     pageCall(prevPage);
//   }
// })

// next.addEventListener('click', () => {
//   if(nextPage <= totalPages){
//     pageCall(nextPage);
//   }
// })

// function pageCall(page){
//   let urlSplit = lastUrl.split('?');
//   let queryParams = urlSplit[1].split('&');
//   let key = queryParams[queryParams.length -1].split('=');
//   if(key[0] != 'page'){
//     let url = lastUrl + '&page='+page
//     getMovies(url);
//   }else{
//     key[1] = page.toString();
//     let a = key.join('=');
//     queryParams[queryParams.length -1] = a;
//     let b = queryParams.join('&');
//     let url = urlSplit[0] +'?'+ b
//     getMovies(url);
//   }
// }