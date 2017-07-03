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
      <form onSubmit={this.handleSubmit} className="nav-search" action="/" method="GET" role="search">
        <input ref={(e) => this.$search = e} value={this.state.query} onChange={this.handleChange} tabIndex="1" type="text" className="nav-search-input" name="q" maxLength="120" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Estoy buscando..." aria-autocomplete="list" aria-haspopup="true" aria-owns="chs-popover-2" autoComplete="off" />
        <button className="nav-search-clear-btn" type="button" title="menu.autocomplete.clear"></button>
        <button className="nav-search-close-btn" type="button" title="menu.autocomplete.close"></button>
        <button type="submit" className="nav-search-btn">
          <i className="nav-icon-search"><span>Buscar</span></i>
        </button>
      </form>
    );
  }
}

/**
 * Expose
 */
export default SearchBox;
