import { src, dest} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

export function css( done ) {
    //Ubica el archivo
    src('src/scss/app.scss')
        .pipe( sass() ) //Asi le decimos que lo compile
        .pipe( dest('build/css')) //El destino
    done()
}