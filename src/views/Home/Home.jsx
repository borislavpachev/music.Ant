import { PropTypes } from 'prop-types';
import TrackMusicCard from '../../components/TrackMusicCard/TrackMusicCard';
import { useState } from 'react';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';

export default function Home({ results }) {
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState(null);

  const selectTrack = (track) => {
    setCurrentlyPlayingTrack(track);
  };

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center
  `}
    >
      <div className="row align-items-center justify-content-center">
        {results.map((result, index) => {
          return (
            <TrackMusicCard
              result={result}
              key={index}
              selectTrack={selectTrack}
            />
          );
        })}
      </div>
      {!currentlyPlayingTrack ? null : (
        <MusicPlayer
          uri={currentlyPlayingTrack}
          setTrack={setCurrentlyPlayingTrack}
        />
      )}
    </div>
  );
}

Home.propTypes = {
  results: PropTypes.array,
};
