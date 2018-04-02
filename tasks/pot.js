module.exports = function( gulp, config ) {

  var   sort  = require( 'gulp-sort' )
    , wpPot = require( 'gulp-wp-pot' )
  ;

  gulp.task( 'pot', [ 'pot:js' ] function() {

    gulp.src( [ '*.php', './**/*.php', '!vendor/*' ] )

      .pipe( sort() )

      .pipe( wpPot( {
        bugReport: config.pot.bugReport,
        domain: config.pot.domain,
        package: config.pot.package,
        lastTranslator: config.pot.lastTranslator,
        team: config.pot.team,
      } ) )

      .pipe( gulp.dest( config.pot.dest + config.pot.domain + '.pot' ) )

  } );

};
