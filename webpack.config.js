const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const settings = {
	// The BrowserSync hostname
	host: 'localhost',
	// The port to run BrowserSync's server on
	port: 3333,

	// A target to proxy all BrowserSync requests to.
	// This can be a local web server, Vagrant or a docker container.
	// This is your local/VM WordPress development site.
	proxy: 'localhost',

	// If you have your Site URL for WordPress set to anything else other than the proxy address,
	// we need to override all URL. In this example I am overriding my site at http://training-ground.local
	urlOverride: /training-ground\.local/g
};

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
		}),
		new BrowserSyncPlugin({
			host: settings.host,
			port: settings.port,
			proxy: settings.proxy,
			rewriteRules: [
				{
					match: settings.urlOverride,
					fn: function (req, res, match) {
						return settings.host + ':' + settings.port;
					}
				}
			]
		})
	]
}
