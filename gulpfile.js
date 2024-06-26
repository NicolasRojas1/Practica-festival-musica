import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

import terser from 'gulp-terser'

export function js( done) {
    //se ubica el archivo de js
    src('src/js/app.js')
        .pipe( terser())
        .pipe( dest('build/js') )

    done()
}

export function css( done ) {
    //Ubica el archivo
    /*source map ayuda a ubicar la hoja de estilos que corresponde a cada segmento de 
    la pagina al darle inspeccionar*/
    src('src/scss/app.scss', {sourcemaps: true}) 
        .pipe( sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError) ) //Asi le decimos que lo compile
        .pipe( dest('build/css', {sourcemaps: true})) //El destino
    done()
}
//No se le pone done por que es un watch y siempre esta a la espera de cambios
export function dev() {
    //que este pendiente de esta hoja de estilos y ejecute la func css
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    /** los asteriscos indican que busque en todas las carpetas que
     * estan dentro de scss y que busque todos los archivos con
     * extension .scss
     */
}
/*sirve para arrancar tareas en cierto orden, empieza con js, luego css y finaliza con dev
quien tiene el watch para ir agregando los cambios de sass*/
export default series( js, css, dev )