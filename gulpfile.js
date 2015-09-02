var gulp = require('gulp'),
    named = require('vinyl-named'),
    webpack = require('gulp-webpack');

var args = {
    configuration: 'Dev'
};

var config = {
    paths: {
        dist: './public',
        index: 'index.html',
        js: '/js',
        src: './src'
    }
};

gulp.task('scripts', function () {
    console.log('Compiling JS...');
    return gulp.src('./src/js/main.js')
        .pipe(named())
        .pipe(webpack({
            output: {
                filename: '[name].bundle.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel?optional[]=runtime&stage=0'
                    }
                ]
            },
            // do external source maps for release, but internal otherwise
            devtool: (args.configuration === 'Release') ? '#source-map' : '#inline-source-map',
        }))
        //.pipe(babel())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('index', function(){
   console.log('Moving index.html');
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./public/'));
});