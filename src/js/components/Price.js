/**
 * Module dependencies
 */
import React from 'react';

/**
 * Component definition
 */
const Price = props => (
  <span className={"price-tag " + (props.className || '')} itemprop="offers" itemscope itemtype="http://schema.org/Offer">
    <meta itemprop="price" content={props.fraction + props.separator + props.cents}/>
    <span className="price-tag-symbol" itemprop="priceCurrency" content={props.currency}>{props.symbol}</span>
    <span className="price-tag-fraction">{props.fraction}</span>
    <span className="price-tag-decimal-separator">{props.separator}</span>
    <span className="price-tag-cents">{props.cents}</span>
  </span>
);

/**
 * Expose component
 */
export default Price;



// const content = props => (
//   <div>
//     <span className="price-tag-symbol" itemprop="priceCurrency" content={props.currency}>{props.symbol}</span>
//     <span className="price-tag-fraction">{props.fraction}</span>
//     <span className="price-tag-decimal-separator">{props.separator}</span>
//     <span className="price-tag-cents">{props.cents}</span>
//   </div>
// );
//
//
// /**
//  * Component definition
//  */
// const Price = props => (
//   <span className={"price-tag " + (props.className || '')} itemprop="offers" itemscope itemtype="http://schema.org/Offer">
//     <meta itemprop="price" content={props.fraction + props.separator + props.cents}/>
//     {
//       props.lineThrough ?
//         <del>{content(props)}</del>
//       :
//         content(props)
//     }
//   </span>
// );
