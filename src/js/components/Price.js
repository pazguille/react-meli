/**
 * Module dependencies
 */
import React from 'react';

/**
 * Component definition
 */
const Price = props => (
  <span className={"price-tag " + (props.className || '')} itemProp="offers" itemScope itemType="http://schema.org/Offer">
    <meta itemProp="price" content={props.fraction + props.separator + props.cents}/>
    <span className="price-tag-symbol" itemProp="priceCurrency" content={props.currency}>{props.symbol}</span>
    <span className="price-tag-fraction">{props.fraction}</span>
    <span className="price-tag-decimal-separator">{props.separator}</span>
    <span className="price-tag-cents">{props.cents}</span>
  </span>
);

/**
 * Component Prop Validation
 */
Price.propTypes = {
  className: React.PropTypes.string,
  currency: React.PropTypes.string.isRequired,
  symbol: React.PropTypes.string.isRequired,
  fraction: React.PropTypes.string.isRequired,
  separator: React.PropTypes.oneOf(['.', ',']).isRequired,
  cents: React.PropTypes.string.isRequired,
  lineThrough: React.PropTypes.bool
};

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
