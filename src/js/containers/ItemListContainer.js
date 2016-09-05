/**
 * Module dependencies
 */
// import React from 'react';
import Preact from 'preact';
import SearchBox from '../components/SearchBox';
import ItemList from '../components/ItemList';

/**
 * ItemListContainer
 */
class ItemListContainer extends Preact.Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.query || '', items: [] };
    this.loadItemsFromServer = this.loadItemsFromServer.bind(this);
  }

  loadItemsFromServer(query) {
    this.setState({ query, items: [] });
    fetch(this.props.url.replace('query', query))
      .then(response => response.json())
      .then(({ results }) => this.setState({ items: results }));
  }

  componentDidMount() {
    if (this.state.query) {
      this.loadItemsFromServer(this.state.query);
    }
  }

  render() {
    return (
      <div id='results'>
        <SearchBox
          query={this.state.query}
          doSearch={this.loadItemsFromServer} />
        <ItemList items={this.state.items} />
      </div>
    );
  }
}

/**
 * Expose component
 */
export default ItemListContainer;
