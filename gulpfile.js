const { src, dest, watch, series, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const plumber = require('gulp-plumber')
const newer = require('gulp-newer')
const browserSync = require('browser-sync').create()
const rigger = require('gulp-rigger')

const paths = {
    html: {
        src: 'src/**/*.html',
        dest: 'dist/',
        main: 'src/index.html'
    },
    styles: {
        src: 'src/assets/scss/**/*.scss',
        dest: 'dist/css'
    },
    css: {
        src: 'src/assets/css/**/*.css',
        dest: 'dist/css'
    },
    images: {
        src: 'src/assets/img/**/*',
        dest: 'dist/img'
    },
    fonts: {
        src: 'src/assets/fonts/**/*',
        dest: 'dist/fonts'
    },
    js: {
        src: 'src/assets/js/**/*.js',
        dest: 'dist/js'
    }
}

function html() {
    return src(paths.html.main).pipe(plumber()).pipe(rigger()).pipe(dest(paths.html.dest)).pipe(browserSync.stream())
}

function copyCss() {
    return src(paths.css.src).pipe(plumber()).pipe(newer(paths.css.dest)).pipe(dest(paths.css.dest)).pipe(browserSync.stream())
}

function styles() {
    return src(paths.styles.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function images() {
    return src(paths.images.src).pipe(newer(paths.images.dest)).pipe(dest(paths.images.dest))
}

function fonts() {
    return src(paths.fonts.src).pipe(newer(paths.fonts.dest)).pipe(dest(paths.fonts.dest))
}

function scripts() {
    return src(paths.js.src).pipe(plumber()).pipe(newer(paths.js.dest)).pipe(dest(paths.js.dest)).pipe(browserSync.stream())
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })

    watch(paths.html.src, html)
    watch(paths.styles.src, styles)
    watch(paths.css.src, copyCss)
    watch(paths.js.src, scripts).on('change', browserSync.reload)
    watch(paths.images.src, images).on('change', browserSync.reload)
    watch(paths.fonts.src, fonts).on('change', browserSync.reload)
}

exports.default = series(parallel(html, styles, copyCss, images, fonts, scripts), serve)
