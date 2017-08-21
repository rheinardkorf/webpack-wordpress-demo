# Demo Plugin

A simple plugin to demonstrate a Webpack workflow with WordPress.

### Requirements

* Node.js -- Install from https://nodejs.org or using NVM (recommended).

## 04_lint_and_minify

Because we like to use standards we're going to setup JS linting (with ESLint) and CSS linting.

### Setup ESLint

Install ESLint packages:

```
npm install --save-dev eslint eslint-loader eslint-config-wordpress
```

Create a new `.eslintrc` file and configure it with the following minimal settings (you can build on these later):

```
{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    // Use the WordPress ESLint config.
    "wordpress"
  ],
  "parserOptions": {
    "sourceType": "module"
  }
}
```

Now setup ESLint as a loader in `webpack.config.js`:

```
{
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
        emitWarning: true,
    }
},
```

If you now run `npm start` or `npm run build` it will lint your JS source files with the .eslintrc config.

### Setup `stylelint` for CSS

Install `stylelint` packages:

```
npm install --save-dev stylelint stylelint-config-standard stylelint-processor-html stylelint-webpack-plugin
```

Create a new `.stylelintrc` configuration file with the follow config:

```
{
  "processors": ["stylelint-processor-html"],
  "extends": "stylelint-config-standard"
}
```

Require the stylelint plugin:

```
const StyleLintPlugin = require('stylelint-webpack-plugin');
```

Configure the `stylelint-webpack-plugin` in `webpack.config.js` (add this to the plugins object):

```
new StyleLintPlugin({ syntax: 'scss' })
```

Now running `npm start` or `npm run build` will lint your Sass files with the .stylelintrc config.

### Minifying your output files

Install the `uglifyjs-webpack-plugin` package:

```
npm install --save-dev uglifyjs-webpack-plugin
```

Require the plugin
```
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
```

Add the plugin to `webpack.config.js` in the plugins object to mangle everything except a few and set sourceMap to true:
```
new UglifyJSPlugin({
    mangle: {
        // Dont mangle these
        except: ['$super', '$', 'exports', 'require']
    },
    sourceMap: true
})
```

*NOTE:* In our previous section for Sass we already set the sourceMap to true.

Now running `npm start` or `npm run build` will minify your outputs.

However, source maps are not being created. To fix this add the following key:value pair to your Webpack config:

```
devtool: 'source-map',
```

Awesome! Now you have minified files including the source maps.

-----

## 03_sass

The most confusing aspect of working with CSS in a Webpack workflow is that the CSS gets added as a JS module. First lets
get a basic Sass workflow setup before we "fix" it.

Install the required dependencies...

```
npm install --save-dev css-loader node-sass sass-loader style-loader
```

Add the relevant loaders for our Sass workflow to `webpack.config.js` below the JS rules:

```
// Run Sass through loaders before bundling into `style.css`
{
    test: /\.scss$/,
    enforce: 'pre',
    loader: [ 'style-loader', 'css-loader', 'sass-loader' ]
},
```

Now for the weird part. To get our CSS to run through the loaders and get our Sass compiled we need to import the Sass
entry file into our JS entry file.

Example in main.js:
```
import '../../css/src/style.scss';

const square = x => x * x;
```

Webpack bundles our CSS as a Javascript module inside `scripts.js`. Though this is fine in some cases, its just not the
WordPress way. Lets extract our CSS out of the bundled file and compile our Sass to our `css/style.css` file instead.

We now need to install a Webpack plugin and reconfigure our `webpack.config.js` file.

Install `extract-text-webpack-plugin`:

```
npm install --save-dev extract-text-webpack-plugin
```

Now define our new plugin object at the top of `webpack.config.js`:

```
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
```

Replace our loader for CSS in the `webpack.config.js` file with the plugin and setup our plugin.

```
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
```

Notice above that we have dropped using `style-loader` as this is responsible for turning CSS into a module, but we now
want a file instead.

Add a new `plugins:` key to our webpack.config.file object and specify the location of our CSS file relative to the
bundled JS file:

```
plugins: [
    new ExtractTextPlugin( {
        filename: '../css/style.css'
    } )
]
```

Great! Now you have Sass setup. You can now use Sass modules and the @import command.

Note: You have to include your root Sass file as an import in your main.js file.


-----

## 02_babel_es6

To get more out of the Webpack workflow we will install and configure Babel for transpiling our ES2015 Javascript.

Install Babel, ES2015 preset and the Babel Loader for Webpack:

```
npm install --save-dev babel-core babel-preset-es2015 babel-loader
```

Create a `.babelrc` file and add the following config:

```
{ "presets": [ "es2015" ] }
```

Configure Webpack to look for JS files and run them through the Babel Loader, which will use the configured Babel preset.
This is done by adding a `modules` key to the Webpack config (one way of doing it). Here is our Webpack file so far...

```
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
```

Try using some ES6 features in main.js and then run `npm start` or `npm run build` to transpile and bundle to scripts.js.

Here is a good test that uses the new arrow function syntax:

```
var square = x => x * x;
```

After transpiling you will see that `scripts.js` contain the following method:

```
var square = function square(x) {
  return x * x;
};
```

Awesome! Now you can write ES6 and have it transpiled and bundled with Webpack.

-----

## 01_npm_webpack

Initialise and setup project:

```
npm init
```

- Remove *main* entry in `package.json`
- Remove *test* entry under *scripts* in `package.json`

Install Webpack as a development dependency:

```
npm install --save-dev webpack
```

Add the following two commands to *scripts* in `package.json`:

```
  "scripts": {
    "start": "webpack --watch",
    "build": "webpack"
  },
```

The *start* command will run Webpack and watch the sources for change. It is run using `npm start`.

The *build* command will run Webpack without watching and is run using `npm run build`.

Create the initial, but basic, `webpack.config.js` file containing:

```
const path = require( 'path' );

module.exports = {
  entry: './js/src/main.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve( __dirname, 'js' )
  }
}
```

Webpack expects a module export with the configuration object. At minimum it needs an entry file and an output file with path.
In the example we use the `path` module to help resolve the path. This can be defined inside the `filename` key, but its better to
properly resolve the path.

Very basic at this stage, but this gives you the start of your Webpack workflow.

Try it with `npm start`, modify your `src/main.js` file and see `scripts.js` automatically being built as you save changes.

Note: If you are using Git, you might want to add `node_modules` to your `.gitignore` file.

-----

## 00_initial

No Webpack yet.

- demo-plugin.php -- The plugin. It adds some content and enqueues assets. That is all.
- css/src/style.scss -- This is where styling work starts.
- js/src/main.js -- This is where JS work starts
- css/style.css -- This is CSS file to enqueue and will change after webpack builds.
- css/scripts.js -- This is the JS file to enqueue and will change after webpack builds.
