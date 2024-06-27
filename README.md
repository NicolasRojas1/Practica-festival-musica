# Proyecto Festival de Música

Este proyecto es una aplicación web para un festival de música, donde se aprende y pone a prueba sobre tecnologías en el Front end como : HTML, CSS, Sass, Mixins JavaScript y Gulp. El objetivo es formarse y aplicar mejores prácticas en el desarrollo web moderno.

## Contenido
- Instalación
- Uso
- Estructura del Proyecto
- Tecnologías Utilizadas

## Instalación

Para clonar y ejecutar este proyecto necesitarás Git y Node.js instalados en tu computadora

```
# Clona este repositorio
git clone https://github.com/NicolasRojas1/Practica-festival-musica

# Entra en el repositorio
cd festival_musica

# Instala las dependencias
npm install

```

## Uso
Para iniciar el servidor de desarrollo y comenzar a trabajar con el proyecto:
```
npm run dev
```
En el puerto 5500

## Despliegue
Este proyecto esta desplegado en Netlify. Puedes verlo aquí:
[Festival de Música](https://festival-musica-dev-web.netlify.app)

## Estructura del proyecto

```
.
├── build
│   ├── css
│   │   └── app.css
|   ├── img
|   |   └── gallery
|   |   |   └── full
|   |   |   └── thumb
│   ├── js
│   │   └── app.js
├── src
│   ├── img
|   |   └── gallery
|   |   |   └── full
|   |   |   └── thumb
│   ├── js
│   │   └── app.js
│   ├── scss
│   │   └── base
|   |   |   └── _globales.scss
|   |   |   └── _variables.scss
|   |   └── layout
|   |   |   └── _header.scss
|   |   |   └── _galeria.scss
|   |   |   └── _index.scss
|   |   └── app.scss
│   └── video
├── .gitignore
├── gulpfile.js
├── index.html
├── package.json
├── package-lock.json
└── README.md

```

## Tecnologías Utilizadas
- HTML5 - Para la estructura del contenido.
- CSS3 - Para los estilos.
- Sass - Un preprocesador CSS.
- JavaScript - Para la interactividad.
- Gulp - Para la automatización de tareas.
- Git - Para el control de versiones.
