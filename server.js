require('dotenv').config();
require('app-module-path').addPath(__dirname);

//automatically looks for ./app/index.js
const App = require('./app');

new App();