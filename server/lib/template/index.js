/**
 * Module dependencies
 */
var app = require('express').Router();
var fetch = require('node-fetch');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var marko = require('marko');
var templatePath = require.resolve('./index.marko');
var template = marko.load(templatePath);

/**
 * Views
 */
var ItemListContainer = require('../../../shared/containers/ItemListContainer').default;

/**
 * renderReact
 */
function renderReact(query, results) {
  const state = {
    q: query,
    items: results,
  };
  return {
    state: JSON.stringify(state),
    html: ReactDOMServer.renderToString(
      <ItemListContainer
        query={state.q}
        items={state.items}
        url="https://api.mercadolibre.com/sites/MLA/search?q=query&limit=10&offset=0"
      />
    ),
  };
}

/**
 * GetItems
 */
function getItems(query) {
  if (query) {
    return fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=10&offset=0`)
      .then(response => response.json())
      .then(({ results }) => renderReact(query, results));
  }
  return renderReact(query);
}

/**
 * Render
 */
function render(req, res) {
  template.render({
    getItems: getItems(req.query.q),
  }, res);
}

/**
 * Module dependencies
 */
app.get('/', render);

/**
 * Expose app
 */
module.exports = app;
