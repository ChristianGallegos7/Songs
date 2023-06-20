import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener("submit", (e)=>{
    e.preventDefault();
    //Obterner data form
    const artista = document.querySelector("#artista").value;
    const cancion = document.querySelector("#cancion").value;

    console.log(artista);
    console.log(cancion);

    //Se dejan los campos vacios se muestra error
    if(artista === '' || cancion === ''){
        UI.divMensajes.innerHTML = "Error todos los campos son obligatorios, NO SEA BRUTO!";
        UI.divMensajes.classList.add("error");
        setTimeout(() => {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove("error");
        }, 3000);
    }else{
        //El formulario se completa se llama a la api
        const api = new API(cancion, artista);
        api.consultarAPI()
            .then(data => {
                if(data.res.lyrics){
                    //LA cancion exite
                    const letra = data.res.lyrics;
                    UI.divResultado.textContent = letra;
                }else{
                    UI.divMensajes.innerHTML = "No existe. Prueba con otra busqueda";
                    UI.divMensajes.classList.add("error");
                    setTimeout(() => {
                        UI.divMensajes.innerHTML = '';
                        UI.divMensajes.classList.remove("error");
                        UI.formularioBuscar.reset();
                    }, 3000);
                }
            })
    }

})