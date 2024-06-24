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
        
        //Agregando imagenes
        galeria.appendChild(imagen)
    }
}