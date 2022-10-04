import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  state = { artistInput: '' };

  handleSearch = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { state } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artistInput">
            <input
              type="text"
              id="artistInput"
              name="artistInput"
              data-testid="search-artist-input"
              onChange={ this.handleSearch }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ state.artistInput.length < 2 }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
