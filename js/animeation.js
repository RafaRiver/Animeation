window.addEventListener("load", loadPage);

function loadPage() {
    //Hacemos el DOM de donde vayamos a hacer la búsqueda
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit",buscar);
    console.log(formulario);
}

function buscar(evento) {
    //console.log(event);
    
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
    
    /*
        **metodo: map()**
        Crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
    */
    resultadosBusqueda.innerHTML = datosFetch.results
    .map(anime=>{
        return `
            <img src="${anime.image_url}"/>
            <p>${anime.title}</p>
            <p>${anime.synopsis}</p>
            <p>${anime.score}</p>
            <p><a href="${anime.url}">Link a la página</a></p>
            
            `
    })
    
}