var gulp            = require( 'gulp' );
var fs              = require( 'fs' );
var del             = require( 'del' );
var replace         = require( 'gulp-replace' );
var uglify          = require( 'gulp-uglify' );
var rename          = require( 'gulp-rename' );
var header          = require( 'gulp-header' );
var _name           = 'microbe';
var now             = new Date();
var _package        = require( './package.json' );

var liscenceLong    = '/*!\n' +
' * Microbe JavaScript Library v' + _package.version + '\n' +
' * ' + _package.homepage + '\n' +
' *\n' +
' * Copyright 2014-' + now.getUTCFullYear() + ' Sociomantic Labs and other contributors\n' +
' * Released under the MIT license\n' +
' * http://m.icro.be/license\n' +
' *\n' +
' * Date: ' + now.toDateString() + '\n' +
' */\n';

var liscenceShort   = '/*! Microbe v' + _package.version + ' | (c) 2014-' + now.getUTCFullYear() + ' Sociomantic Labs | http://m.icro.be/license */\n';

var browserify      = require( 'browserify' );
var token           = 'ThisIsVeryUnlikelyThatAVariableWillBeCalledThisWay';
var exportName      = 'µ';


gulp.task( 'build', function()
{
    browserify( './src/' + _name + '.js', { standalone: token } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/dist/' + _name + '.js' ) )
        .on( 'finish', function()
        {
            gulp.src( './dist/' + _name + '.js' )
                .pipe( replace( token, exportName ) )
                .pipe( header( liscenceLong ) )
                .pipe( gulp.dest( './dist/' ) );
        } );
} );


gulp.task( 'min', function()
{
    browserify( './src/' + _name + '.js', { standalone: token } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/dist/' + _name + '.min.js' ) )
        .on( 'finish', function()
        {
            gulp.src( './dist/' + _name + '.min.js' )
                .pipe( replace( token, exportName ) )
                .pipe( uglify() )
                .pipe( header( liscenceShort ) )
                .pipe( gulp.dest( './dist/' ) );
        });
});


gulp.task( 'tests', function()
{
    browserify( './tests/buildTests.js' )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/tests/tests.js' ) )
        .on( 'finish', function()
        {
            gulp.src( './tests/tests.js' )
                .pipe( gulp.dest( './tests/' ) );
        } );
});


gulp.task(  'clean', function ()
{
  return del( [
    'dist/'
  ] );
} );


gulp.task( 'default', [], function()
{
    gulp.start( [ 'build', 'min', 'tests' ] );
} );


gulp.task( 'microbe', function()
{
    _name = 'microbe';
    gulp.start( [ 'build', 'min', 'tests' ] );
} );


gulp.task( 'selectorEngine', function()
{
    _name = 'microbe.selectorEngine';
    gulp.start( [ 'build', 'min', 'tests' ] );
} );


gulp.task( 'toolkit', function()
{
    _name = 'microbe.toolkit';
    gulp.start( [ 'build', 'min', 'tests' ] );
} );


gulp.task( 'watch', function()
{
    gulp.watch( [ 'src/**/*.js', 'tests/unit/*.js', 'tests/unit/cytoplasm/*.js' ], [ 'default' ] );
} );
