import path from 'path'
import fs from 'fs'
import { glob } from 'glob'
import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

import terser from 'gulp-terser'
import sharp from 'sharp'

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
//Imagenes ligeras con Nodejs
export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    //revisa que exista esta carpeta, sino la genera
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    //revisa que sean imagenes para comenzar a procesarlas
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

//Imagenes WebP con NodeJs
//Funcion encargada de buscar las imagenes
export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}
//Funcion para procesar las imagenes
function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

//No se le pone done por que es un watch y siempre esta a la espera de cambios
export function dev() {
    //que este pendiente de esta hoja de estilos y ejecute la func css
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    watch('src/img/**/*.{png,jpg}', imagenes)
    /** los asteriscos indican que busque en todas las carpetas que
     * estan dentro de scss y que busque todos los archivos con
     * extension .scss
     */
}
/*sirve para arrancar tareas en cierto orden, empieza con js, luego css y finaliza con dev
quien tiene el watch para ir agregando los cambios de sass*/
export default series( crop, js, css, imagenes, dev )