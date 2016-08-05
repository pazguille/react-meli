/**
 * Module dependencies
 */
import React from 'react';
import Item from './Item';

/**
 * Component definition
 */
const ItemListWrapper = ({ data }) => {
  data.priceFormated = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: data.currency_id,
  }).format(data.price);
  data.address = data.address.city_name;

  return (
    <li>
      <Item data={data} />
    </li>
  );
};

/**
 * Expose component
 */
export default ItemListWrapper;
