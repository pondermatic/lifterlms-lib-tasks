module.exports = function( gulp ) {

	var   fs = require( 'fs' )
		, merge = require( 'merge' )
		, package = require( './package.json' )
		, config
	;

	config = {
		pot: {
			bugReport: 'https://lifterlms.com/my-account/my-tickets',
			domain: package.name,
			dest: 'i18n/' + package.name + '.pot',
			lastTranslator: 'Thomas Patrick Levy <thomas@lifterlms.com>',
			team: 'LifterLMS <help@lifterlms.com>',
			package: package.name,
		}
	};

	if ( fs.existsSync( './.llmsconfig' ) ) {
		var file = JSON.parse( fs.readFileSync( './.llmsconfig', 'utf8' ) );
		config = merge.recursive( config, file );
	}

	require( __dirname + '/tasks/pot' )( gulp, config );

};