import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins'; // <== Load all the plugins without imports

import del from 'del';
import path from 'path';

const plugins = gulpLoadPlugins();

const bases = {
    src: 'src/',
    dist: 'dist/',
};

const sources = {
    env: ['./package.json', './.gitignore', './.env'],
    templates: ['templates/**/*.pug'],
    styles: ['sass/**/*.scss'],
    scripts: ['scripts/**/*.js', '!dist/**', '!node_modules/**'],
};

// Clean Task
gulp.task('clean', () => {
    del.sync(['dist/**', 'dist/.*', '!dist']);
});

// Copy Task
gulp.task('copy-env', () => {
    gulp.src(sources.env)
        .pipe(plugins.newer(bases.dist))
        .pipe(gulp.dest(bases.dist));
});

// HTML Task
gulp.task('html', () => {
    gulp.src(sources.templates, { cwd: bases.src })
        .pipe(plugins.newer(bases.dist))
        .pipe(plugins.pug())
        .pipe(gulp.dest(bases.dist));
});

// SASS Task
gulp.task('sass', () => {
    gulp.src(sources.styles, { cwd: bases.src })
        .pipe(plugins.newer(bases.dist))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(bases.dist, '/css/')));
});

// Scripts Task
// Lint Task
gulp.task('lint', () => {
    gulp.src(sources.scripts, { cwd: bases.src })
        .pipe(plugins.eslint())
        .pipe(plugins.eslint().format)
        .pipe(plugins.eslint.failAfterError());
});

// Babel Task
gulp.task('babel', () =>
    gulp.src([...sources.scripts, '!gulpfile.babel.js'], { base: '.' })
    .pipe(plugins.newer(bases.dist))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.'), {
        includeContent: false,
        sourceRoot(file) {
            return path.relative(file.path, __dirname);
        },
    }),
);
// Browser Sync

gulp.task('default', ['clean', 'copy-env', 'html']);
// End of File
