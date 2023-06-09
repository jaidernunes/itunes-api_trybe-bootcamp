import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    loading: false,
    // amIFavorite: false,
    gotFavorites: [],
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    // console.log(gotFavorites);
    const gotFavorites = await getFavoriteSongs();
    this.setState({
      gotFavorites,
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, key, trackId, trackObj } = this.props;
    const { loading, gotFavorites } = this.state;

    const handleCheck = async ({ target }) => {
      // const { id } = target; --- { target }
      // const value = target.type === 'checkbox' ? target.checked : target.value;

      this.setState(() => ({
        loading: true,
      }));

      console.log(target);
      console.log(target.checked);

      if (target.checked) {
        await addSong(trackObj);
      } else {
        await removeSong(trackObj);
      }
      // if (target.checked === false) {
      //   await removeSong(trackObj);
      // } else {
      //   await addSong(trackObj);
      // }

      const updateFavorites = await getFavoriteSongs();
      console.log(updateFavorites);
      this.setState({
        gotFavorites: updateFavorites,
        loading: false,
      });

      // this.setState({
      //   [name]: value,
      // });
    };

    const amIFavorite = (id) => gotFavorites.some(
      (favorite) => (favorite.trackId === id),
    );

    return (
      loading ? <Loading /> : (
        <div>
          {trackName}
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <input
            type="checkbox"
            label="Favorita"
            name={ key }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ handleCheck }
            trackobj={ trackObj }
            checked={ amIFavorite(trackId) }
          />
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackObj: PropTypes.shape({}).isRequired,
};
