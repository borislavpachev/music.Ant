import { useEffect, useState } from 'react';
import { getMyTopTracks } from '../../../services/music.service';
import TrackMusicCard from '../../TrackMusicCard/TrackMusicCard';
import MusicPlayer from '../../MusicPlayer/MusicPlayer';
import { PropTypes } from 'prop-types';
import HorizontalScroll from '../../../hoc/HorizontalScroll';

export default function UserTopTracks({ token }) {
  const [userTopTracks, setUserTopTracks] = useState(null);
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState(null);

  useEffect(() => {
    getMyTopTracks(token).then((data) => {
      if (data) {
        setUserTopTracks(
          data.map((track) => {
            return {
              artist: track.artists[0].name,
              trackName: track.name,
              uri: track.uri,
              albumCover: track.album.images[0].url,
            };
          })
        );
      }
    });
  }, [token]);

  const selectTrack = (track) => {
    setCurrentlyPlayingTrack(track);
  };

  return (
    <HorizontalScroll styleClasses={'d-flex mx-4 my-1'}>
      {!userTopTracks ? (
        <div
          className="container justify-self-center
         fs-1 text-center border rounded m-5 p-5"
        >
          No user tracks
        </div>
      ) : (
        userTopTracks.map((track, index) => {
          return (
            <div style={{ display: 'inline-block' }} key={index}>
              <TrackMusicCard
                track={track}
                key={index}
                selectTrack={selectTrack}
              />
            </div>
          );
        })
      )}
      {!currentlyPlayingTrack ? null : (
        <MusicPlayer
          uri={currentlyPlayingTrack}
          setTrack={setCurrentlyPlayingTrack}
        />
      )}
    </HorizontalScroll>
  );
}

UserTopTracks.propTypes = {
  token: PropTypes.string,
};
