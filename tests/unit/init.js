/* global document, window, µ, $, QUnit, Benchmark, buildTest  */
module.exports = function( buildTest )
{
    QUnit.module( 'init.js' );


    /**
     * µ init wrap element tests
     *
     * @test    one body
     * @test    passes
     */
    QUnit.test( 'wrap an element', function( assert )
    {
        var _body = document.getElementsByTagName( 'body' )[0];
        var µBody = µ( _body );

        assert.equal( µBody.length, 1, 'one body' );
        assert.deepEqual( µBody[ 0 ], _body, 'passes' );

        buildTest(
        'µ( _el )', function()
        {
            return µ( _body );
        },

        '$( _el )', function()
        {
            return $( _body );
        }, 0 );
    });


    /**
     * µ init query class tests
     *
     * @test    one div
     * @test    passes
     */
    QUnit.test( 'query class', function( assert )
    {
        var _div = document.getElementsByClassName( 'example--class' )[0];
        var µDiv = µ( '.example--class' );

        assert.equal( µDiv.length, 1, 'one div' );
        assert.deepEqual( µDiv[ 0 ], _div, 'passes' );

        buildTest(
        'µ( \'.example--class\' )', function()
        {
            return µ( '.example--class' );
        },

        '$( \'.example--class\' )', function()
        {
            return $( '.example--class' );
        }, 1 );
    });


    /**
     * µ init query id tests
     *
     * @test    one body
     * @test    passes
     */
    QUnit.test( 'query id', function( assert )
    {
        var _div = document.getElementById( 'example--id' );
        var µDiv = µ( '#example--id' );

        assert.equal( µDiv.length, 1, 'one div' );
        assert.deepEqual( µDiv[ 0 ], _div, 'passes' );

        buildTest(
        'µ( \'#example--id\' )', function()
        {
            return µ( '#example--id' );
        },

        '$( \'#example--id\' )', function()
        {
            return $( '#example--id' );
        }, 2 );
    });


    /**
     * µ init query tagname tests
     *
     * @test    correct element
     * @test    passes
     */
    QUnit.test( 'query tagname', function( assert )
    {
        var _div = document.getElementsByTagName( 'div' )[0];
        var µDiv = µ( 'div' );

        assert.equal( µDiv[ 0 ].tagName, 'DIV', 'correct element' );
        assert.deepEqual( µDiv[ 0 ], _div, 'passes' );

        buildTest(
        'µ( \'div\' )', function()
        {
            return µ( 'div' );
        },

        '$( \'div\' )', function()
        {
            return $( 'div' );
        }, 3 );
    });


    /**
     * µ init query combined tests
     *
     * @test    one div
     * @test    passes
     */
    QUnit.test( 'query combined', function( assert )
    {
        var _div = document.querySelector( 'div#example--combined.example--combined' );
        var µDiv = µ( 'div#example--combined.example--combined' );

        assert.equal( µDiv.length, 1, 'one div' );
        assert.deepEqual( µDiv[ 0 ], _div, 'passes' );

        buildTest(
        'µ( \'div#example--combined.example--combined\' )', function()
        {
            return µ( 'div#example--combined.example--combined' );
        },

        '$( \'div#example--combined.example--combined\' )', function()
        {
            return $( 'div#example--combined.example--combined' );
        }, 4 );
    });


    /**
     * µ init query with microbe scope tests
     *
     * @test    two divs
     * @test    correct element
     */
    QUnit.test( 'query with microbe scope', function( assert )
    {
        var µDiv = µ( 'div', µ( '.example--class--groups' ) );
        var $Div = $( 'div', $( '.example--class--groups' ) );

        assert.equal( µDiv.length, 2, 'two divs' );
        assert.equal( µDiv[0].tagName, 'DIV', 'correct element' );

        buildTest(
        'µ( \'div\', µDiv )', function()
        {
            return µ( 'div', µDiv );
        },

        '$( \'div\', $Div )', function()
        {
            return $( 'div', $Div );
        }, 5 );
    });


    /**
     * µ init query with element scope tests
     *
     * @test    two divs
     * @test    correct parent
     */
    QUnit.test( 'query with element scope', function( assert )
    {
        var _scopeEl = µ( '.example--class--groups' )[0];

        var µDiv = µ( 'div', _scopeEl );

        assert.equal( µDiv.length, 2, 'two divs' );
        assert.deepEqual( µDiv.first().parent()[0], _scopeEl, 'correct parent' );

        buildTest(
        'µ( \'div\', _scopeEl )', function()
        {
            return µ( 'div', _scopeEl );
        },

        '$( \'div\', _scopeEl )', function()
        {
            return $( 'div', _scopeEl );
        }, 6 );
    });


    /**
     * µ init query with string scope tests
     *
     * @test    correctly formed selector
     * @test    two divs
     */
    QUnit.test( 'query with string scope', function( assert )
    {
        var µDiv = µ( 'div', '.example--class--groups' );
        assert.equal( µDiv.selector(), '.example--class--groups div', 'correctly formed selector' );
        assert.equal( µDiv.length, 2, 'two divs' );


        buildTest(
        'µ( \'div\', \'.example--class--groups\' )', function()
        {
            return µ( 'div', '.example--class--groups' );
        },

        '$( \'div\', \'.example--class--groups\' )', function()
        {
            return $( 'div', '.example--class--groups' );
        }, 7 );
    });
};
