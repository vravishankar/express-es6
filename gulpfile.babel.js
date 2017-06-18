import gulp from 'gulp'

import gulpLoadPlugins from 'gulp-load-plugins' // <== Load all the plugins without imports

import del from 'del'
import path from 'path'

const plugins = gulpLoadPlugins()

const bases = {
    src: 'src/',
    dist: 'dist/'
}

const sources = {
    env: ['./package.json', './.gitignore', './.env'],
    templates: ['templates/**/*.pug'],
    styles: ['sass/**/*.scss'],
    scripts: ['scripts/**/*.js']
}

// Clean Task
gulp.task('clean', () => {
    del.sync(['dist/**', 'dist/.*', '!dist'])
})

// Copy Task
gulp.task('copy-env', () => {
    gulp.src(sources.env)
        .pipe(plugins.newer(bases.dist))
        .pipe(gulp.dest(bases.dist))
})

// HTML Task
gulp.task('html', () => {
    gulp.src(sources.templates, { cwd: bases.src })
        .pipe(plugins.pug())
        .pipe(plugins.newer(bases.dist))
        .pipe(gulp.dest(bases.dist))
})

gulp.task('default', ['clean', 'copy-env', 'html'])