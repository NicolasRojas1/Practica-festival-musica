//para escuchar hasta que este listo el HTML y el css 
document.addEventListener('DOMContentLoaded', function() {

    crearGaleria()
})

function crearGaleria() {
    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        //Asi creo el html de 16 imagenes, vacias sin atributos
        const imagen = document.createElement('IMG');

        //La ubicacion de la imagen 
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = 'Imagen Galería';

        //Event handler, encargado de detectar y responder a una interaccion
        imagen.onclick = function() {
            mostrarImagen(i);
        }
        //Agregando imagenes
        galeria.appendChild(imagen)
    }
}

function mostrarImagen(i) {
    //Selecciono la imagen
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen Galería';
    
    //Generar Modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal')
    modal.onclick = cerrarModal; 
    //ya con el modal, agrego la imagen
    modal.appendChild(imagen);

    //agregar al HTML
    const body = document.querySelector('body')
    //creo esta clase para quitar la barra lateral
    body.classList.add('overflow-hidden');
    body.appendChild(modal)
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove(); //si existe el modal quitalo
        const body = document.querySelector('body')
        //asi elimino la clase
        body.classList.remove('overflow-hidden');
    }, 500) //en medio segundo
}