window.addEventListener("load", loadPage);

function loadPage() {
    
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit",buscar);
    console.log(formulario);
}

function buscar(evento) {
    
    evento.preventDefault();
    
    const form = new FormData(this);
    const busqueda = form.get("input");
    const url = "https://api.jikan.moe/v3";
    
    fetch(`${url}/search/anime?q=${busqueda}&page=1`)
    .then(response=>response.json())
    .then(datos)
    .catch(error=>console.warn(error.message));
}

function datos(datosFetch) {
    //console.log(datosFetch.results);
    const resultadosBusqueda = document.getElementById("informacion");
    
    resultadosBusqueda.innerHTML = datosFetch.results
    .map(anime=>{
        return `
            <section class="card col-lg-3 col-md-3 col-sm-12 col-xs-12 justify-content-center card-body my-3">
                	  	<img src="${anime.image_url}" class="card-img-top img-fluid" alt="portada del ánime">	
                	    <h5 class="card-title mt-3">${anime.title}</h5>
                	    <p class="card-text">${anime.synopsis}</p>
                	    <p><span class="text">Score: </span>${anime.score}</p>
                	    <a href="${anime.url}" class="btn btn-primary" target="_blank">Link a la página</a>
            </section>
            `
    })
    
}

