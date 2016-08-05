/**
 * Module dependencies
 */
import React from 'react';
import SearchBox from '../components/SearchBox';
import ItemList from '../components/ItemList';

/**
 * ItemListContainer
 */
class ItemListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.query || '', items: this.props.items || [] };
    this.loadItemsFromServer = this.loadItemsFromServer.bind(this);
  }

  loadItemsFromServer(query) {
    this.setState({ query, items: [] });
    fetch(this.props.url.replace('query', query))
      .then(response => response.json())
      .then(({ results }) => this.setState({ items: results }));
  }

  render() {
    return (
      <div id="results">
        <SearchBox
          query={this.state.query}
          doSearch={this.loadItemsFromServer}
        />
        <ItemList items={this.state.items} />
      </div>
    );
  }
}

/**
 * Expose component
 */
export default ItemListContainer;
