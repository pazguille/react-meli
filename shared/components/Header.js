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
  <header role="banner" className="nav-header" style={{ display: 'block' }}>
    <div className="nav-bounds">
      <Logo />
      <input type="checkbox" id="nav-header-menu-switch" />
      <div className="nav-header-menu-wrapper">
        <label htmlFor="nav-header-menu-switch" aria-controls="nav-header-menu">
          <span className="hamburger-top-bread"></span>
          <span className="hamburger-patty"></span>
          <span className="hamburger-bottom-bread"></span>
        </label>
        <nav id="nav-header-menu">
          <a tabIndex="2" className="option-register" href="https://registration.mercadolibre.com.ar/registration" rel="nofollow">Regístrate</a>
          <a tabIndex="3" href="https://www.mercadolibre.com/jms/mla/lgz/login?platform_id=ml&amp;go=http%3A%2F%2Flistado.mercadolibre.com.ar%2Fiphone" rel="nofollow" className="option-login nav-header-lnk-login">Ingresa</a>
          <a tabIndex="6" href="https://vender.mercadolibre.com.ar" rel="nofollow" className="option-sell nav-header-btn-pub">Vender</a>
          <a tabIndex="4" className="option-help" href="http://ayuda.mercadolibre.com.ar/ayuda"><i className="nav-icon-help"><span>Ayuda</span></i></a>
        </nav>
      </div>
      <SearchBox
        query={query}
        doSearch={doSearch}
      />
    </div>
  </header>
);

/**
 * Expose
 */
export default Header;
