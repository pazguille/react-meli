/**
 * Module dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Components
 */
import ItemListContainer from '../../../shared/containers/ItemListContainer';

/**
 * Get server state
 */
const state = JSON.parse(document.getElementById('state').content);

/**
 * Start App
 */
ReactDOM.render(
  <ItemListContainer
    query={state.q}
    items={state.items}
    url="https://api.mercadolibre.com/sites/MLA/search?q=query&limit=10&offset=0"
  />,
  document.getElementById('root')
);
