/**
 * Module dependencies
 */
// import React from 'react';
import Preact from 'preact';
import ItemListWrapper from './ItemListWrapper';

/**
 * ItemList
 */
const ItemList = ({ items }) => (
  <ul className='slats ch-slats ch-list'>
    {items.map(item => (
      <ItemListWrapper key={item.id} data={item} />)
    )}
  </ul>
);

/**
 * Expose component
 */
export default ItemList;
