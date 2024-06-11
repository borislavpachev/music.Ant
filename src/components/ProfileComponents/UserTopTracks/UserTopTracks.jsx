import { useContext } from 'react';
import TrackMusicCard from '../../TrackMusicCard/TrackMusicCard';
import HorizontalScroll from '../../../hoc/HorizontalScroll';
import { AppContext } from '../../../contexts/AppContext';
import useMyTopTracks from '../../../hooks/useMyTopTracks';

export default function UserTopTracks() {
  const [{ setCurrentlyPlayingTrack }] = useContext(AppContext);
  const { userTopTracks } = useMyTopTracks();

  const selectTrack = (track) => {
    setCurrentlyPlayingTrack(track);
  };

  return (
    <>
      <HorizontalScroll styleClasses={'d-flex mx-4'}>
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
