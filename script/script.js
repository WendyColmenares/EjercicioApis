const API_URL = 'https://rickandmortyapi.com/api/character'
const IMG_PATH = ``
const SEARCH_URL = 'https://rickandmortyapi.com/api/character/?name='

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.querySelector('#main')

const getMovies = async (url, busqueda) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        if (data.results.length === 0) {
            swal.fire({
                title: 'Error!',
                text: `No se ha encontrado nada referente a ${busqueda}`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        } else {
            showMovies(data.results)
        }
    } catch (error) {
        swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}

getMovies(API_URL)

const showMovies = (movies) => {
    main.innerHTML = ''
    movies.forEach(movie => {
        const{image,name, species,gender,origin,status} = movie
        const movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')
        movieDiv.innerHTML =`
        <img src="${IMG_PATH + image}">
        <div class = "movie-info">
            <h3>${name}</h3>
            <span class="green">${species}</span>
        </div>
        <div class = "overview">
        <h3>Estado : ${status}</h3>
        <h3>Genero : ${gender}</h3>
        <h3>Origen : ${origin}</h3>
        
    </div>
        `

    main.appendChild(movieDiv)
    });
    console.log(movies);
}

form.addEventListener('submit', e =>{
    e.preventDefault()

    const searchTerm = search.value.toLocaleLowerCase() 
    if(searchTerm && searchTerm !== ''){
        getMovies( SEARCH_URL+ searchTerm, searchTerm)
        search.value=''
    }else{
        swal.fire({
            title: 'Error',
            text:'Debe escribir algo en la barra de busqueda',
            icon:'error',
            confirmButtonText: 'Aceptar'
        })
    }
})