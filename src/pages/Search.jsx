import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  state = {
    artistInput: '',
    loading: false,
    lastSearch: '',
    foundAlbums: {},
  };

  handleSearch = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  searchClick = async () => {
    const { artistInput } = this.state;

    this.setState({
      loading: true,
      lastSearch: artistInput,
      artistInput: '',
    });

    const albumsAPI = await searchAlbumsAPI(artistInput);
    console.log(albumsAPI);

    this.setState({
      foundAlbums: albumsAPI,
      loading: false,
    });
  };

  render() {
    const { state } = this;
    const { artistInput, lastSearch, foundAlbums, loading } = state;
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
              value={ artistInput }
            />
          </label>

          { loading ? <Loading />
            : (
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ artistInput.length < 2 }
                onClick={ this.searchClick }
              >
                Pesquisar
              </button>)}

          {(lastSearch.length >= 2 && foundAlbums.length >= 1) && (
            <h5>
              Resultado de álbuns de:
              {' '}
              {lastSearch}
            </h5>
          )}

          { foundAlbums.length >= 1 ? (foundAlbums.map((album) => (
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
              key={ album.collectionId }
            >
              <div>
                <img
                  src={ album.artworkUrl100 }
                  alt={ `Cover of the album ${album.collectionName}` }
                />
                <h3>
                  { album.collectionName }
                </h3>
                <h5>
                  {album.artistName}
                </h5>
              </div>
            </Link>
          ))) : (
            <h3>Nenhum álbum foi encontrado</h3>
          )}

        </form>
      </div>
    );
  }
}
