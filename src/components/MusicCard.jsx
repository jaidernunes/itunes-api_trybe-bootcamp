import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    loading: false,
    amIFavorite: false,
  };

  render() {
    const { trackName, previewUrl, key, trackId, trackObj } = this.props;
    const { loading, amIFavorite } = this.state;

    const handleCheck = async () => {
      // const { id } = target; --- { target }
      // const value = target.type === 'checkbox' ? target.checked : target.value;

      this.setState((prevState) => ({
        loading: true,
        // favoriteIDs: [...favoriteIDs, id],
        amIFavorite: !prevState.amIFavorite,
      }));

      await addSong(trackObj);
      this.setState({
        loading: false,
      });

      // this.setState({
      //   [name]: value,
      // });
    };

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
            checked={ amIFavorite }
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
