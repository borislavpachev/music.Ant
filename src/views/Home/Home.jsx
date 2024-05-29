import { PropTypes } from 'prop-types';
import TrackMusicCard from '../../components/TrackMusicCard/TrackMusicCard';
import { useEffect, useState } from 'react';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import { useNavigate } from 'react-router-dom';
import { redirectUri } from '../../spotify.config';
import toast from 'react-hot-toast';
import { getNewReleases } from '../../services/music.service';
import HorizontalScroll from '../../hoc/HorizontalScroll';

export default function Home({
  accessToken,
  results,
  setAccessToken,
  setRefreshToken,
  setExpiresIn,
}) {
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState(null);
  const [newReleases, setNewReleases] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      getToken(code);
      navigate('/');
    }
  }, []);

  useEffect(() => {
    getNewReleases(accessToken).then((data) => {
      if (data) {
        setNewReleases(
          data.map((release) => {
            return {
              artist: release.artists[0].name,
              trackName: release.name,
              uri: release.uri,
              albumCover: release.images[0].url,
              type: release.album_type,
            };
          })
        );
      }
    });
  }, [accessToken]);

  const getToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: `${import.meta.env.VITE_CLIENT_ID}`,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    try {
      const response = await fetch(
        'https://accounts.spotify.com/api/token',
        payload
      );
      const data = await response.json();

      if (data) {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        localStorage.setItem('expiresIn', data.expires_in);

        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setExpiresIn(data.expires_in);
      } else {
        console.error('Error fetching token:', data);
      }
    } catch (error) {
      console.error('Error in getToken:', error);
      toast.error('Error in getToken');
    }
  };

  const selectTrack = (track) => {
    setCurrentlyPlayingTrack(track);
  };

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center
  `}
    >
      {results.length === 0 ? (
        <div className="w-100 row align-items-center justify-content-center">
          <div className="text-center m-3 p-5 border">
            <h3>No search results</h3>
          </div>
          <HorizontalScroll styleClasses={'h-75 d-flex mx-4 my-1'}>
            {!newReleases ? (
              <div
                className="w-100 justify-self-center
         fs-2 text-center border rounded m-5 p-5"
              >
                No new releases
              </div>
            ) : (
              <>
                <div
                  className="d-flex flex-column align-items-center
                justify-content-center mt-2 p-3 bg-success h-100 w-100"
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
      ) : (
        <div className="row align-items-center justify-content-center">
          {results.map((result, index) => {
            return (
              <TrackMusicCard
                track={result}
                key={index}
                selectTrack={selectTrack}
              />
            );
          })}
        </div>
      )}
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
  accessToken: PropTypes.string,
  results: PropTypes.array,
  setAccessToken: PropTypes.func,
  setRefreshToken: PropTypes.func,
  setExpiresIn: PropTypes.func,
};
