//para escuchar hasta que este listo el HTML y el css 
document.addEventListener('DOMContentLoaded', function() {

    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    //scrollNav()
})

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    //listener para el scroll
    window.addEventListener('scroll', function() {
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');

        }
    })
}

function crearGaleria() {
    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        //Asi creo el html de 16 imagenes, vacias sin atributos
        const imagen = document.createElement('IMG');

        //mejorando performance
        imagen.loading = 'lazy';
        imagen.width = "300"
        imagen.height = "200"

        //La ubicacion de la imagen 
        imagen.src = `src/img/gallery/thumb/${i}.jpg`;
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

    //Botón cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

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

function resaltarEnlace() {
    document.addEventListener('scroll', function () {
        //Asi tengo las secciones y los nav links
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach(section => {

            //La distancia de un elemento desde arriba
            const sectionTop = section.offsetTop
            //console.log(sectionTop);
            //La altura de algun elemento
            const sectionHeight = section.clientHeight
            //console.log(sectionHeight);

            if (window.scrollY >= ( sectionTop - sectionHeight / 3 ) ) {
                actual = section.id;
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if (link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

// function scrollNav() {
//     const navLinks = document.querySelectorAll('.navegacion-principal a')

//     navLinks.forEach( link => {
//         link.addEventListener('click', e => {
//             //para que al darle click a cualquier elemento de navegacion no lo lleve a esa seccion
//             e.preventDefault()
//             //Para que seleccione el id de cada seccion
//             const sectionScroll = e.target.getAttribute('href')
//             //Aqui ya tengo la seccion capturada cuando le doy click
//             const section = document.querySelector(sectionScroll)
//             //
//             section.scrollIntoView({behavior: 'smooth'})
//         })
//     })
// }