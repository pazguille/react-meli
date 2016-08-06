/**
 * Module dependencies
 */
var app = require('express').Router();
var fetch = require('node-fetch');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

/**
 * Template View Resolver
 */
var pug = require('pug');
function Template(path) {
  this._template = pug.compileFile(require.resolve(path), { cache: true });
}
Template.prototype.render = function (locals, res) {
  res.header('Content-Type', 'text/html; charset=utf-8');
  var html = this._template(locals);
  res.write(html);
  res.end();
};

/**
 * Template
 */
var template = new Template('./index.pug');

/**
 * Views
 */
var ItemListContainer = require('../../../shared/containers/ItemListContainer').default;

/**
 * GetItems
 */
function getItems(req, res, next) {
  if (req.query.q) {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=10&offset=0`)
      .then(response => response.json())
      .then(({ results }) => {
        req.items = results;
        next();
      });
  } else {
    next();
  }
}

/**
 * Render
 */
function render(req, res) {
  const state = {
    q: req.query.q,
    items: req.items,
  };

  template.render({
    state: JSON.stringify(state),
    html: ReactDOMServer.renderToString(
      <ItemListContainer
        query={state.q}
        items={state.items}
        url="https://api.mercadolibre.com/sites/MLA/search?q=query&limit=10&offset=0"
      />
    ),
  }, res);
}

/**
 * Module dependencies
 */
app.get('*', getItems, render);

/**
 * Expose app
 */
module.exports = app;
