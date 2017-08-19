const path = require( 'path' );

module.exports = {
	entry: './js/src/main.js',
	output: {
		filename: 'scripts.js',
		path: path.resolve( __dirname, 'js' )
	},
	module: {
		loaders: [
			// Run JS through Babel Loader before bundling it to `scripts.js`
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
}
