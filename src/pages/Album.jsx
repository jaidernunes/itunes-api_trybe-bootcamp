import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  state = {
    albumInfo: {},
    albumTracks: [],
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const gotMusic = await getMusics(params.id);
    // const albumTracks = gotMusic.slice(1);

    this.setState({
      albumInfo: gotMusic[0],
      albumTracks: gotMusic.slice(1),
    });
  }

  render() {
    // const { match: { params } } = this.props;
    const { state } = this;
    const { albumInfo, albumTracks } = state;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
        <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
        { albumTracks.map((track) => (
        // if (track.kind === 'song') {
          <MusicCard
            key={ track.trackId }
            trackName={ track.trackName }
            previewUrl={ track.previewUrl }
            trackId={ track.trackId }
            trackObj={ track }
          />
        ))}

      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }),
  }).isRequired,
  // params: PropTypes.string.isRequired,
};
