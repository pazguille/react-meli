/**
 * Module dependencies
 */
import React from 'react';
import Price from './Price';

/**
 * Component definition
 */
const Item = ({ data }) => (
  <article className="item static-height">
    <a href={data.link} title={data.title}>
      <figure className="item-image">
        <img alt={data.tile} src={data.thumbnail} height="250" width="250" />
      </figure>
      <div className="item-description" style={{ paddingTop: '16px' }}>
        <Price
          currency={data.currency_id}
          symbol="$"
          fraction={data.price.toString().split('.')[0]}
          separator=","
          cents={data.price.toString().split('.')[1] || '00'}
          lineThrough={false}
        />
        <h2 style={{ top: '5px' }}>{data.title}</h2>
      </div>
    </a>
  </article>
);

/**
 * Expose component
 */
export default Item;
