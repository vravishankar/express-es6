# Express application using ES6
## 1. Pre Requisites
```sh
1. Install Node JS
2. Install NPM (Node Package Manager)
```
## 2. Scaffolding
```sh
npm init -y
touch README.md
touch .gitignore
touch .flowconfig
touch gulpfile.config.js
touch .babelrc
mkdir src
mkdir dist
```
## 3. Development
#### 3.1 Install Gulp
```sh
npm install -g gulp-cli
npm install --save-dev gulp
```
#### 3.2 Install Lint (ESLINT)
```sh
npm install --save-dev gulp-eslint
npm install -g install-peerdeps
install-peerdeps --dev eslint-config-airbnb
```
#### 3.3 Install Sass
```sh
npm install --save-dev gulp-sass
npm install --save-dev gulp-sourcemaps
npm install --save-dev gulp-autoprefixer
```
```javascript
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// ... variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});
```
#### 3.4 Install Babel
```sh
npm install --save-dev babel-register
npm install --save-dev babel-preset-2015
npm install --save-dev babel-preset-stage-0
```
_.babelrc_
```json
{
    "presets": ["es2015","stage-0"]
}
```
#### 3.3 Install Gulp Plugins
```sh
npm install --save-dev gulp-load-plugins
npm install --save-dev gulp-babel
npm install --save-dev gulp-util
npm install --save-dev gulp-pug
npm install --save-dev gulp-newer
npm install --save-dev del
```
#### 3.4 Install Express & Middlewares
```sh
npm install --save express
npm install --save body-parser
```
#### 4 Build Gulp Config File
```javascript
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
    env: ['./package.json','./.gitignore','./.env'],
    templates: ['templates/**/*.pug'],
    styles: ['sass/**/*.scss'],
    scripts: ['scripts/**/*.js']
}

// Clean Task
gulp.task('clean', () => {
    del.sync(['dist/**','dist/.*', '!dist'])
})

// Copy Task
gulp.task('copy-env', () => {
    gulp.src(sources.env)
    .pipe(plugins.newer(bases.dist))
    .pipe(gulp.dest(bases.dist))
})

// HTML Task
gulp.task('html', () => {
    gulp.src(sources.templates, {cwd: bases.src})
    .pipe(pug())
    .pipe(plugins.newer(bases.dist))
    .pipe(gulp.dest(bases.dist))
})

gulp.task('default',['clean','copy-env','html'])
```