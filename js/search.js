document
  .getElementById("buttonModal")
  .addEventListener("click", myFunction, false);

function myFunction() {
  searchApiData(document.getElementById("inputModal").value);
  $("#exampleModal").modal();
}

function clearModal() {
  // limpar o modal
  const modalBody = $(".modal-body");
  modalBody = "";
}

function searchListener() {
  this.obj = JSON.parse(this.responseText);
  console.log(this.obj);
  console.log(this.obj.results[0].title);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  const modalBody = $(".modal-body");
  modalBody.empty();

  this.obj.results.forEach((movie) => {
    if (movie.backdrop_path != null && movie.title != "") {
      const movieDetails = getDetailMovie(movie.id);
      console.log(movieDetails);
      const bodyItem = ` 
    <div class="controller overflow-auto mt-4" >
    <div class="row d-flex justify-content-center">
    <div class="col-lg-3 col-md-4 col-sm-12 d-flex justify-content-center">
        <a href="https://www.imdb.com/title/${
          movieDetails.imdb_id
        }" target="_blank"> <image
        class="VideoFrame mr-4"
        src="${imageBaseUrl + movie.poster_path}"
        style="max-width: 70% !important"
      ></image>
      </a>
      </div>
      <div class="col-lg-9 col-md-8 col-sm-12">
      <div>
        <h3 class="text-left">${movie.title}</h3>
        <p class="text-left"> ${movie.overview}</p>
        <p class="text-left"><b>Data de Lançamento : </b> ${formatDate(
          movie.release_date
        )}</p>
        
        <p class="text-left">
          <b>Estrelas: </b>
          <span class="fa fa-star checked"></span>
          ${movieDetails.vote_average}
        </p>
        <a href="https://www.imdb.com/title/${
          movieDetails.imdb_id
        } target="_blank">
        <button type="button" class="btn btn-primary">Ver Mais..</button>
        </a>
       
      </div>
      </div>
        <hr/>
    </div>
  </div>
  `;

      modalBody.append(bodyItem);
    } else {
    }
  });
}

function getApiSearchByMovieName(nomeFilme) {
  let apiBase =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    "60bee520b64f1eeffb3b3cb7e60b7c44" +
    "&query=(nome_filme)&region=BR&language=pt-BR";
  return apiBase.replace("(nome_filme)", nomeFilme);
}

function searchApiData(movieName) {
  var oReq = new XMLHttpRequest();
  oReq.onload = searchListener;

  oReq.open("get", getApiSearchByMovieName(movieName), true);
  try {
    oReq.send();
  } catch (error) {
    console.log("error on api retriaving", error);
  }
}

function getApiUrl(idFilme) {
  let apiBase =
    `https://api.themoviedb.org/3/movie/${idFilme}?api_key=` +
    "60bee520b64f1eeffb3b3cb7e60b7c44" +
    "&region=BR&language=pt-BR";
  return apiBase;
}

function getDetailMovie(idFilme) {
  let url = getApiUrl(idFilme);

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);

  xhttp.send();

  return JSON.parse(xhttp.responseText);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
