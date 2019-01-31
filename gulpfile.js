/* Gulp plugins */
var gulp = require('gulp');
var cssimport = require('gulp-cssimport');
var cssnano = require('gulp-cssnano');
var rollup = require('gulp-better-rollup');
var minify = require('gulp-minify');
var sucrase = require('@sucrase/gulp-plugin');

/* Rollup plugins */
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var json = require('rollup-plugin-json');
var builtins = require('rollup-plugin-node-builtins');
var rootImport = require('rollup-plugin-root-import');
var globals = require('rollup-plugin-node-globals');
var urbitrc = require('./.urbitrc');

gulp.task('copy-urbit', function () {
  let ret = gulp.src('./dist/**/*');

  urbitrc.URBIT_PIERS.forEach(function(pier) {
    ret = ret.pipe(gulp.dest(pier));
  });

  return ret;
});

gulp.task('css-bundle', function() {
  return gulp
    .src('src/css/index.css')
    .pipe(cssimport())
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/web/write/css'));
});

/*
  Sucrase is a plugin that does JSX, Typescript, and other transformations.
    - We just use it for JSX for now
*/

gulp.task('jsx-transform', function(cb) {
  return gulp.src('src/**/*.js')
    .pipe(sucrase({
      transforms: ['jsx']
    }))
    .pipe(gulp.dest('dist/web/write'));
});

/*
  Rollup plugin TLDR:
    - NOTE: THE ORDER OF THESE PLUGINS MATTER

    + commonJS()
      - Parses commonjs-style "require" statements as imported modules
      - Pretty standard dependency required for most NPM-sourced dependency
    + replace()
      - Replace particular strings with other things
    + rootImport ()
      - go from
          "import x from '/src/js/components/thing.js'"
            to
          "import x from '/components/thing'"  (the preferred import style)
    + resolve()
      - allows importing libraries node_modules without specifying path
          eg "import x from '/node_modules/react'" -> "import x from 'react'"
    + json()
      - loads .json files as parsed JSON objects
    + globals()
      - Complimentary library to builtins() that polyfills more node libraries
    + builtins()
      - Many modern NPM repositories are packaged for _node_ environments,
        and they use _node_ standard library primitives, like
          - fs
          - events
          - buffer
          - util
      - This plugin shims those node dependencies to work in the browser
      - WARNING: This plugin is very expensive!
        - Using a library that requires node builtin functions may
          vastly increase your build size and compile times
*/

gulp.task('js-imports', function(cb) {
  return gulp.src('dist/web/write/js/index.js')
    .pipe(rollup({
      plugins: [
        commonjs({
          namedExports: {
            'node_modules/react/index.js': [ 'Component' ]
          }
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        rootImport({
          root: `${__dirname}/dist/web/write/js`,
          useEntry: 'prepend',
          extensions: '.js'
        }),
        resolve()
        // json(),
        // globals(),
        // builtins(),
      ]
    }, 'umd'))
    .on('error', function(e){
      console.log(e);
      cb();
    })
    .pipe(gulp.dest('./dist/web/write/js'))
    .on('end', cb);
});

gulp.task('js-minify', function () {
  return gulp.src('./dist/web/write/js/index.js')
    .pipe(minify())
    .pipe(gulp.dest('./dist/web/write/js'));
});

gulp.task('html-copy', function() {
  return gulp
    .src('src/index.html')
    .pipe(gulp.dest('./dist/web/write'));
})

gulp.task('js-bundle', gulp.series('jsx-transform', 'js-imports'));
gulp.task('js-minify', gulp.series('jsx-transform', 'js-imports', 'js-minify'));

gulp.task('default', gulp.parallel('js-bundle', 'css-bundle', 'html-copy'));
gulp.task('watch', gulp.series('default', function() {
  gulp.watch('src/**/*.js', gulp.parallel('js-bundle'));
  gulp.watch('src/**/*.css', gulp.parallel('css-bundle'));
  gulp.watch('src/**/*.html', gulp.parallel('html-copy'));
}));
