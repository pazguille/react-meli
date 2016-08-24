/**
 * Module dependencies
 */
import React from 'react';
import Logo from './Logo';
import SearchBox from '../components/SearchBox';

/**
 * Header
 */
const Header = ({ query, doSearch }) => (
  <header className="ch-header">
    <Logo />

    <SearchBox
      query={query}
      doSearch={doSearch}
    />

    <menu>
      <li className="ch-nav"><a className="ch-icon-cogs" href="#navigation"><span>Menú</span></a></li>
    </menu>
    <div className="ch-hide ch-box-highlight" id="navigation" role="navigation">
      <h3>¿En qué país quieres buscar?</h3>
      <form action="/" method="GET"></form>
    </div>
  </header>
);

/**
 * Expose
 */
export default Header;
