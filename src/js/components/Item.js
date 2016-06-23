/**
 * Module dependencies
 */
import React from 'react';

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
      <p className='ch-price'>{data.price}</p>
    </a>
  </article>
);

/**
 * Expose component
 */
export default Item;
