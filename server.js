require('app-module-path').addPath(__dirname + '/app');
//automatically looks for ./app/index.js
const App = require('./app');

new App();