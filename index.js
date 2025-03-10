module.exports = function( gulp ) {

  var fs = require( 'fs' )
    , merge = require( 'merge' )
    , package = require( process.cwd() + '/package.json' )
    , argv = require( 'yargs' ).argv
    , config
  ;

  config = {
    _package: package,
    build: {
      custom: [],
    },
    docs: {
      package: package.name,
      src: './docs/',
    },
    package_name: 'LifterLMS', // This is confusing?
    pot: {
      bugReport: 'https://lifterlms.com/my-account/my-tickets',
      domain: package.name,
      dest: 'i18n/',
      js: true,
      jsClassname: 'LLMS_l10n',
      jsFilename: 'class-llms-l10n.php',
      jsSince: '1.0.0',
      jsSrc: [],
      lastTranslator: 'Thomas Patrick Levy <thomas@lifterlms.com>',
      team: 'LifterLMS <help@lifterlms.com>',
      package: package.name,
      phpSrc: [ './*.php', './**/*.php', '!vendor/**', '!tmp/**', '!tests/**' ],
    },
    publish: {
      github: {
        branch: 'trunk',
        org: 'gocodebox',
        repo: package.name,
        url: package.repository.url,
      },
      img: 'https://cdn2.lifterlms.com/brand-assets/lifterlms-logo-alt_color-on-ffffff.png',
      slug: package.name,
      slack: {
        channel: '#general',
      },
      svn: {
        base: 'http://svn.wp-plugins.org/',
        slug: package.name,
      },
      lifterlms: {
        make: {
          cats: [ 5 ],
          tags: [],
        },
        pot: true,
        slug: package.name,
      },
      privacy: 'private',
      title: package.name,
    },
    scripts: {
      // Whether or not to build a ".dist" version (useful when using includes).
      dist: false,
      dest: 'assets/js/',
      // Define the settings passed to `gulp-include`.
      include: {
        includePaths: [
          // look for includes in the lib-tasks node_modules directory.
          __dirname + '/node_modules',
          // look for includes in the project node_modules directory.
          process.cwd() + '/node_modules',
        ]
      },
      src: [ 'assets/js/**/*.js', '!assets/js/**/*.min.js', '!assets/js/**/*.js.map' ],
      watch: [ 'assets/js/**/*.js', '!assets/js/**/*.min.js', '!assets/js/**/*.js.map' ],
    },
    styles: {
      autoprefixer: 'last 2 versions',
      dest: 'assets/css/',
      src: [ 'assets/scss/**/*.scss', '!assets/scss/**/_*.scss' ],
      watch: [ 'assets/scss/**/*.scss' ],
    },
    slush: {
      includes_dir: './includes/',
      package_main: package.name,
      shortname: '',
    },
    versioner: {
      custom: [],
      main: [ package.name + '.php', 'class-' + package.name + '.php' ],
      scripts: true,
      src: [ './*.php', './inc/**/*.php', './includes/**/*.php', './templates/**/*.php', './tests/**/*.php' ],
    },
    watch: {
      custom: [],
    },
    zip: {
      composer: false,
      dest: 'dist/',
      name: package.name,
      src: {
        // Default glob.
        default: [
          './**/*.*',
          '!./assets/scss/**',
          '!./deploy/**', '!./dist/**', '!./tmp/**', '!./gulpfile.js/**', '!./gulpfile.js/**/*.*', '!./node_modules/**', '!./tests/**',
          '!./**/*.yml',
          '!./**/composer.json', '!./**/composer.lock',
          '!./**/package.json', '!./**/package-lock.json',
          '!./*.xml', '!./*.xml.dist',
          '!./README.md',
        ],
        // Add extra files to the glob, useful when wanting to add something withouth having to overwrite the entire default.
        custom: [],
      },
    }
  };

  if ( fs.existsSync( './.llmsconfig' ) ) {
    var file = JSON.parse( fs.readFileSync( './.llmsconfig', 'utf8' ) );
    config = merge.recursive( config, file );
  }

  if ( ! config.pot.jsSrc.length ) {
    config.pot.jsSrc = config.scripts.src;
  }

  // add defaults for distribution suffixes.
  if ( false !== config.scripts.dist ) {
    // if "true" use default ".dist".
    config.scripts.dist = true === config.scripts.dist ? '.dist' : config.scripts.dist;

    // ignore the dist versions for building and watching.
    config.scripts.src.push( '!assets/js/**/*' + config.scripts.dist + '.js' );
    config.scripts.watch.push( '!assets/js/**/*' + config.scripts.dist + '.js' );

  }

  require( __dirname + '/tasks/pot-php' )( gulp, config, argv );
  require( __dirname + '/tasks/pot-js' )( gulp, config, argv );
  require( __dirname + '/tasks/pot' )( gulp, config, argv );
  require( __dirname + '/tasks/publish' )( gulp, config, argv );
  require( __dirname + '/tasks/scripts' )( gulp, config, argv );
  require( __dirname + '/tasks/styles' )( gulp, config, argv );
  require( __dirname + '/tasks/styles-rtl' )( gulp, config, argv );
  require( __dirname + '/tasks/textdomain' )( gulp, config, argv );
  require( __dirname + '/tasks/versioner' )( gulp, config, argv );
  require( __dirname + '/tasks/watch' )( gulp, config, argv );
  require( __dirname + '/tasks/zip' )( gulp, config, argv );

  require( __dirname + '/tasks/build' )( gulp, config, argv );

};
