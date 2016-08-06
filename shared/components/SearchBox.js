/**
 * Module dependencies
 */
import React from 'react';

/**
 * SearchBox
 */
class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.query || '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(eve) {
    eve.preventDefault();
    const query = this.state.query.trim();
    if (query !== '') {
      this.props.doSearch(query);
    }
  }

  handleChange(eve) {
    this.setState({ query: eve.target.value });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ query: nextProps.query });
  }

  componentDidMount() {
    this.$search.focus();
  }

  render() {
    return (
      <header className="ch-header">
        <h1 className="ch-logo">
          <img alt="MercadoLibre" src="assets/logo.png" />
        </h1>

        <form className="ch-form ch-header-form" action="./" method="GET" role="search" onSubmit={this.handleSubmit}>
          <input type="text" id="query" className="search" maxLength="60" name="q" autoComplete="off" placeholder="Busca en MercadoLibre..." ref={(e) => this.$search = e} value={this.state.query} onChange={this.handleChange}/>
          <input type="submit" value="Buscar" accessKey="b" className="ch-icon-search" />
        </form>

        <menu>
          <li className="ch-nav"><a className="ch-icon-cogs" href="#navigation"><span>Menú</span></a></li>
        </menu>
        <div className="ch-hide ch-box-highlight" id="navigation" role="navigation">
          <h3>¿En qué país quieres buscar?</h3>
          <form action="/" method="GET"></form>
        </div>
      </header>
    );
  }
}

/**
 * Expose
 */
export default SearchBox;
