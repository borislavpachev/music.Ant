import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { getNewReleases } from '../../services/music.service';
import TrackMusicCard from '../../components/TrackMusicCard/TrackMusicCard';
import HorizontalScroll from '../../hoc/HorizontalScroll';
import { AppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import HomeInfo from '../../components/HomeInfo/HomeInfo';
import { getToken } from '../../services/spotify.service';

export default function Home({ accessToken, setAccessToken }) {
  const [newReleases, setNewReleases] = useState(null);
  const [loading, setLoading] = useState(false);
  const [{ setCurrentlyPlayingTrack }] = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      getToken(code,setAccessToken);
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    getNewReleases(accessToken).then((data) => {
      setLoading(false);
      if (data) {
        setNewReleases(
          data.map((release) => {
            return {
              artist: release.artists[0].name,
              trackName: release.name,
              uri: release.uri,
              albumCover: release.images[0].url,
            };
          })
        );
      }
    });
  }, [accessToken]);

  const selectTrack = (track) => {
    setCurrentlyPlayingTrack(track);
  };

  if (loading) {
    return <Loader size="150px" />;
  }

  return (
    <div className="container">
      <div
        className={`custom-scroll row justify-content-center
       align-items-center fs-5 py-5
    `}
      >
        <div className="w-100 align-items-center justify-content-center">
          <HorizontalScroll styleClasses={'h-100 d-flex'}>
            {!newReleases ? (
              <div className="bg-white rounded p-3 mx-3 w-100 text-center">
                <img
                  src="/ant_logo1.png"
                  alt="logo"
                  style={{ height: '70px', width: '70px' }}
                />
              </div>
            ) : (
              <>
                <div
                  style={{ zIndex: 10001, left: 0 }}
                  className="position-sticky d-flex flex-column align-items-center
                justify-content-center mt-2 p-3 bg-success me-3"
                >
                  <h4 className="text-center text-white"> New Releases</h4>
                </div>
                {newReleases.map((track, index) => {
                  return (
                    <div style={{ display: 'inline-block' }} key={index}>
                      <TrackMusicCard
                        track={track}
                        key={index}
                        selectTrack={selectTrack}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </HorizontalScroll>
        </div>
        <HomeInfo />
      </div>
    </div>
  );
}

Home.propTypes = {
  accessToken: PropTypes.string,
  setAccessToken: PropTypes.func,
};
