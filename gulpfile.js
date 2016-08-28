var gulp = require('gulp');
var es = require('event-stream');

var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var nodemon = require('gulp-nodemon');

var libFiles = {
    js: {
        angular: [
            'public/bower_components/angular/angular.min.js',
        ],
        ui: [
            'public/bower_components/jquery/dist/jquery.min.js',
            'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
        ]
    },
    css : [
        'public/bower_components/bootstrap/dist/css/bootstrap.min.css',
    ]
};

var cssFiles = 'public/stylesheets/*.css';
var jsFiles = 'public/javascripts/**/*.js';

var buildDest = 'public/build/';

gulp.task('libs', function() {
    return es.merge([
        gulp.src(libFiles.js.angular)
            .pipe(concat('angulars.min.js'))
            .pipe(gulp.dest(buildDest)),
        gulp.src(libFiles.js.ui)
            .pipe(concat('ui.min.js'))
            .pipe(gulp.dest(buildDest)),
        gulp.src(libFiles.css)
            .pipe(concat('ui.min.css'))
            .pipe(gulp.dest(buildDest)),
    ]);
});

gulp.task('css', function() {
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildDest));
});

gulp.task('js', function() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildDest));
});

gulp.task('build', ['libs', 'css', 'js'], function() {
    // thats literally all we do, css and js
});

gulp.task('watch', ['build'], function() {
    gulp.watch(jsFiles, ['js']);
    gulp.watch(cssFiles, ['css']);
});

gulp.task('server', ['watch'], function() {
    nodemon({
        script: 'bin/www',
    });
})
