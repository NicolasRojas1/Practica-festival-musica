import { src, dest, watch } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

export function css( done ) {
    //Ubica el archivo
    src('src/scss/app.scss')
        .pipe( sass().on('error', sass.logError) ) //Asi le decimos que lo compile
        .pipe( dest('build/css')) //El destino
    done()
}
//No se le pone done por que es un watch y siempre esta a la espera de cambios
export function dev() {
    //que este pendiente de esta hoja de estilos y ejecute la func css
    watch('src/scss/**/*.scss', css)
    /** los asteriscos indican que busque en todas las carpetas que
     * estan dentro de scss y que busque todos los archivos con
     * extension .scss
     */
}