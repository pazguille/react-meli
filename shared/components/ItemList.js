/**
 * Module dependencies
 */
import React from 'react';
import ItemListWrapper from './ItemListWrapper';

/**
 * ItemList
 */
const ItemList = ({ items }) => (
  <ol className="item-list list-items core listing core-results">
    {items.map(item => (
      <ItemListWrapper key={item.id} data={item} />)
    )}
  </ol>
);

/**
 * Expose component
 */
export default ItemList;
