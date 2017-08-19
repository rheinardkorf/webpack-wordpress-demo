const path = require( 'path' );

module.exports = {
	entry: './js/src/main.js',
	output: {
		filename: 'scripts.js',
		path: path.resolve( __dirname, 'js' )
	}
}
