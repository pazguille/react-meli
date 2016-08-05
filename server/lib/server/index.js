
/**
 * Module dependencies
 */
var express = require('express');
var config = require('lib/config');

/**
 * Create express app
 */
var app = express();

/**
 * Use babel
 */
require('babel-register');

/**
 * Set jade templates
 */
app.set('views', __dirname + '/../template');
app.set('view engine', 'pug');

/**
 * Set static directory
 */
app.use(express.static(__dirname + '/../../../public'));

/**
 * Mount template router
 */
app.use('/', require('lib/template'));

/**
 * Server listen on port
 */
app.listen(config.server.port, config.server.host, function() {
  console.log('App listening on port %d.', config.server.port);
});

/**
 * Handle unhandled exceptions
 */
process.on('unhandledException', function (err) {
  console.log('err', err.toString());
});

/**
 * Expose app
 */
module.exports = app;
