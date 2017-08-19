# Demo Plugin

A simple plugin to demonstrate a Webpack workflow with WordPress.

### Requirements

* Node.js -- Install from https://nodejs.org or using NVM (recommended).

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
