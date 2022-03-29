// Requires
const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const image = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const { parallel } = require('gulp');

// Funções
function tarefaCSS(callback) {
    gulp.src(['./src/css/*.css', './node_modules/bootstrap/dist/css/bootstrap.css'])
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./dist/css"))
    return callback()
}
function tarefaJS(callback) {
    gulp.src('./src/vendor/bootstrap/js/bootstrap.min.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'))
    return callback()
}
function tarefaHTML(callback) {
    gulp.src('./src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/html'))
    return callback()
}  
function tarefaIMG(callback) {
    gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/img'))
    return callback()
}

// Chamadas
exports.default = parallel(tarefaCSS,tarefaHTML,tarefaJS);
exports.styles = tarefaCSS;
exports.scripts = tarefaJS;
exports.htmls = tarefaHTML;
exports.images = tarefaIMG;