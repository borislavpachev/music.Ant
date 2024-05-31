import { useContext, useEffect, useState } from 'react';
import { getMyTopTracks } from '../../../services/music.service';
import TrackMusicCard from '../../TrackMusicCard/TrackMusicCard';
import { PropTypes } from 'prop-types';
import HorizontalScroll from '../../../hoc/HorizontalScroll';
import { AppContext } from '../../../contexts/AppContext';

export default function UserTopTracks({ token }) {
  const [userTopTracks, setUserTopTracks] = useState(null);
  const [{ setCurrentlyPlayingTrack }] = useContext(AppContext);

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
    <>
      <HorizontalScroll styleClasses={'d-flex mx-4 my-1'}>
        {!userTopTracks ? (
          <div
            className="container justify-self-center
         fs-1 text-center border rounded m-5 p-5"
          >
            No user tracks
          </div>
        ) : (
          <>
            <div
              style={{ zIndex: 10001, left: 0 }}
              className="position-sticky d-flex flex-column align-items-center 
  justify-content-center mt-1 px-4 me-2 bg-success"
            >
              <h3 className="text-center text-white">My Top Tracks</h3>
            </div>
            {userTopTracks.map((track, index) => (
              <div style={{ display: 'inline-block' }} key={index}>
                <TrackMusicCard track={track} selectTrack={selectTrack} />
              </div>
            ))}
          </>
        )}
      </HorizontalScroll>
    </>
  );
}

UserTopTracks.propTypes = {
  token: PropTypes.string,
};
