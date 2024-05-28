import { PropTypes } from 'prop-types';
import TrackMusicCard from '../../components/TrackMusicCard/TrackMusicCard';
import { useEffect, useState } from 'react';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import { useNavigate } from 'react-router-dom';
import { clientId, redirectUri } from '../../spotify.config';
import toast from 'react-hot-toast';
import useAuth from '../../customHooks/useAuth';
import { getUserData } from '../../services/auth.service';

export default function Home({ results, setUser }) {
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState(null);
  const { accessToken, setAccessToken, setRefreshToken, setExpiresIn } =
    useAuth();

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
    if (!accessToken) return;
    getUserData(accessToken)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [accessToken]);

  const getToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
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
        <div className="row align-items-center justify-content-center">
          <div className="mt-5">
            <h3>No search results</h3>
          </div>
        </div>
      ) : (
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
  results: PropTypes.array,
  setUser: PropTypes.func,
};
