react-packaging
===============

Examples of how to create a workflow with React JS using different packaging tools

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

* Run `npm install`
* Run `node server` to start the development server
* Run `gulp` to develop
* Run `gulp deploy` to minify and deploy files to `dist`
* Run `NODE_ENV=production node server` to run production version of server

### Webpack

* Run `npm install`
* Run `node server` to start the development server
* Run `gulp` to develop
* Run `gulp deploy` to minify and deploy files to `dist`
* Run `NODE_ENV=production node server` to run production version of server