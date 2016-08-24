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
      <form className="ch-form ch-header-form" action="./" method="GET" role="search" onSubmit={this.handleSubmit}>
        <input type="text" id="query" className="search" maxLength="60" name="q" autoComplete="off" placeholder="Busca en MercadoLibre..." ref={(e) => this.$search = e} value={this.state.query} onChange={this.handleChange}/>
        <input type="submit" value="Buscar" accessKey="b" className="ch-icon-search" />
      </form>
    );
  }
}

/**
 * Expose
 */
export default SearchBox;
