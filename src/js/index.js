/**
 * Module dependencies
 */
import Preact from 'preact';
// import React from 'react';
// import ReactDOM from 'react-dom';

/**
 * Components
 */
import ItemListContainer from './containers/ItemListContainer';

/**
 * Start App
 */
Preact.render(
  <ItemListContainer
    query=''
    url='https://api.mercadolibre.com/sites/MLA/search?q=query&limit=10&offset=0'
  />,
  document.getElementById('root')
);
