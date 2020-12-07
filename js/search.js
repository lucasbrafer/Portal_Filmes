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
    const bodyItem = ` 
    <div class="controller overflow-auto mt-4" >
    <div class="d-flex justify-content-center"> 
        <a href="https://www.imdb.com/title/${
          movie.title
        }" target="_blank"> <image
        class="VideoFrame mr-4"
        src="${imageBaseUrl + movie.backdrop_path}"
        
      ></image>
      </a>
      <div>
        <h3>${movie.title}</h3>
        <p> ${movie.overview}</p>git
      </div>
        <hr/>
    </div>
  </div>
  `;
    modalBody.append(bodyItem);
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
