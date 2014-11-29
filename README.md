react-packaging
===============

Examples of how to create a workflow with React JS using different packaging tools. Is part of the following post: [Choosing the correct packaging tool for React JS](http://christianalfoni.github.io/javascript/2014/08/29/choosing-the-correct-packaging-tool-for-react-js.html)

All projects has `dev` as their development folder, and `dev/app` as root folder of the application itself.

### Features:
* Starts a react application
* Has a workflow for rebundling project (except requirejs, which does not need it)
* Has a small webserver for delivering main html, both for `development` and `production`
* Webserver prerenders the App compoenent on server first (except requirejs in development and Duo alltogether)

### Require JS

* Run `npm install`
* Run `node server` to start the development server
* Run `grunt deploy` to minify and deploy files to `dist`
* Run `NODE_ENV=production node server` to run production version of server

### Browserify
You can also use an updated version at this repo: [react-app-boilerplate](https://github.com/christianalfoni/react-app-boilerplate)
* Run `npm install`
* Run `node server` to start the development server
* Run `gulp` to develop
* Run `gulp deploy` to minify and deploy files to `dist`
* Run `NODE_ENV=production node server` to run production version of server

### Webpack

* Run `npm install`
* Run `node server` to start the development server
* Run `grunt` to develop
* Run `grunt deploy` to minify and deploy files to `dist`
* Run `NODE_ENV=production node server` to run production version of server

### Duo

* Run `npm install`
* Run `node server` to start the development server
* Run `gulp` to develop
* Run `gulp deploy` to minify and deploy files to `dist`
* Run `NODE_ENV=production node server` to run production version of server
