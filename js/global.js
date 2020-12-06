const API_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJlZTUyMGI2NGYxZWVmZmIzYjNjYjdlNjBiN2M0NCIsInN1YiI6IjVmY2MyYTQ1ODEzODMxMDAzZjgwODg0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ub851Tj0EDXxKE5AF_m6OvLIZXUG0_lXnQ8IndL7dW8";
const API_BASE_URL = "https://api.themoviedb.org/3/";

export const apiGet = async(url) => {
    try {
        const finalUrl = API_BASE_URL + url;

        const responsePromiss = await fetch(finalUrl, {
            method: "GET",
            headers: getHeaders(),
        });
        const response = await responsePromiss.json();

        return response;
    } catch (error) {
        return null;
    }
};

const getHeaders = () => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + API_TOKEN);
    headers.append("Content-Type", "application/json");

    return headers;
};

$(document).ready(async() => {
    const nowPlaying = await getNowPlaying();
    populateCarousel(nowPlaying);
});

async function getNowPlaying() {
    try {
        const response = await apiGet(
            "/movie/now_playing?region=BR&language=pt-BR"
        );
        const nowPlaying = response.results;

        return nowPlaying;
    } catch (err) {
        return null;
    }
}

async function getMovieDetails(movieId) {
    try {
        const movie = await apiGet(`/movie/${movieId}?region=BR&language=pt-BR`);

        return movie;
    } catch (err) {
        return null;
    }
}

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function getCategoriesFlags(categories) {
    let html = "";

    categories.forEach((category, index) => {
        const flag = `
          
                 <span> ${category.name}, </span> 
            
      `;

        html += flag;
    });

    return html;
}

function getProductionCompaniesFlags(productionCompanies, imageBaseUrl) {
    let html = "";

    productionCompanies.forEach((pc, index) => {
        if (pc.logo_path) {
            const flag = `
              <span>${pc.name},</span>
          `;

            html += flag;
        }
    });

    return html;
}

function populateCarousel(nowPlaying) {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const carouselContainer = $(".carousel-inner");
    const carouselIndicatorsContainer = $(".carousel-indicators");

    console.log("Fala");

    console.log(nowPlaying);

    nowPlaying.forEach(async(movie, index) => {
        const movieDetails = await getMovieDetails(movie.id);

        if (movie.poster_path && movie.overview) {
            const carouselItem = `
          <div class="carousel-item${index === 0 ? " active" : ""}">
          <div class="container">
          <a href="https://www.imdb.com/title/${
            movieDetails.imdb_id
          }" target="_blank">
            <image
                class="VideoFrame"
                src="${imageBaseUrl + movie.backdrop_path}"
                
              ></image>
              </a>
              <div class="lancamentoInfo">
                <div class="row">
                <div class="col">
                <a class="text-white" href="https://www.imdb.com/title/${
                  movieDetails.imdb_id
                }" target="_blank">
                <h3>${movie.title}</h3>
                </a>
                <!-- Sinopse -->
                <p class="text-left">
                  <b>Sinopse: </b>${movie.overview}
                </p>
                </div>
                </div>
                <!-- Infos -->
                <div class="row">
                <div class="col">
                <div>
                  <b>Categorias: ${" "}</b>  ${getCategoriesFlags(
        movieDetails.genres
      )}
      </div>
      </div>
                </div>
                <div class="row mt-3">
                <div class="col">
                <div>
                  <b>Produzido por: ${" "}</b>   ${getProductionCompaniesFlags(
        movieDetails.production_companies,
        imageBaseUrl
      )}
      </div>
      </div>
      </div>
                </div>
                <!-- Release Date -->
                <div class="row mt-3">
                  <div class="col">
                    <p class="text-left"><b>Data de Lançamento : </b> ${formatDate(
                      movie.release_date
                    )}</p>
                  </div>
                </div>
                <!-- Avaliacao -->
                <div class="row">
                  <div class="col">
                    <p class="text-left">
                      <b>Estrelas: </b>
                      <span class="fa fa-star checked"></span>
                      ${movieDetails.vote_average}
                    </p>
                   
                  </div>
                  
                </div>
                
                
              </div>
           
              </div>
          </div>
  
          `;
            const carouselIndicator = `
              
          `;

            carouselContainer.append(carouselItem);
            carouselIndicatorsContainer.append(carouselIndicator);
        }
    });
}