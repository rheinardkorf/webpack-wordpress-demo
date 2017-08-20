const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './js/src/main.js',
	output: {
		filename: 'scripts.js',
		path: path.resolve( __dirname, 'js' )
	},
	devtool: 'source-map',
	module: {
		loaders: [
			// Setup ESLint loader for JS.
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					emitWarning: true,
				}
			},
			// Run JS through Babel Loader before bundling it to `scripts.js`
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			// Run Sass through loaders before bundling into `style.css`
			{
				test: /\.scss$/,
				enforce: 'pre',
				loader: ExtractTextPlugin.extract( [
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader'
					}
				] )
			},
		]
	},
	plugins: [
		new ExtractTextPlugin( {
			filename: '../css/style.css'
		} ),
		new StyleLintPlugin({ syntax: 'scss' }),
		new UglifyJSPlugin({
			mangle: {
				// Skip mangling these
				except: ['$super', '$', 'exports', 'require']
			},
			sourceMap: true
		})
	]
}
