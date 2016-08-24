/**
 * Module dependencies
 */
import React from 'react';
import Price from './Price';

/**
 * Component definition
 */
const Item = ({ data }) => (
  <article className='item'>
    <a href={data.permalink} data-permalink={data.permalink}>
      <figure>
        <img src={data.thumbnail} alt={data.title} width='90' height='90'/>
      </figure>
      <h2>{data.title}</h2>
      <p className='location'>En {data.address}</p>
      <Price
        currency={data.currency_id}
        symbol="$"
        fraction={data.price.toString().split('.')[0]}
        separator=","
        cents={data.price.toString().split('.')[1] || '00'}
        lineThrough={false}
      />
    </a>
  </article>
);

/**
 * Expose component
 */
export default Item;
