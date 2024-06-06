import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { getNewReleases } from '../../services/music.service';
import TrackMusicCard from '../../components/TrackMusicCard/TrackMusicCard';
import HorizontalScroll from '../../hoc/HorizontalScroll';
import { AppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { redirectUri } from '../../spotify.config';
import toast from 'react-hot-toast';

export default function Home({
  accessToken,
  setAccessToken,
  setRefreshToken,
  setExpiresIn,
}) {
  const [newReleases, setNewReleases] = useState(null);
  const [{ setCurrentlyPlayingTrack }] = useContext(AppContext);
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
        setExpiresIn(61);
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

        <div className="px-5 my-4">
          Welcome to <strong>Music.ant</strong>, your ultimate destination for
          searching and playing your favorite tracks seamlessly. Built with the
          latest web technologies, Music.ant leverages the power of the Spotify
          API and modern React frameworks to deliver a smooth and engaging music
          experience.
          <br />
          <br />
          <h5> Key Features:</h5>
          <ul>
            <li>
              <strong>Track Search:</strong> Effortlessly search for songs,
              artists, and albums using the extensive Spotify music library.
            </li>
            <li>
              <strong>Instant Playback:</strong> Enjoy instant playback of
              tracks directly within the app.
            </li>
            <li>
              <strong>User-Friendly Interface:</strong> Navigate through a clean
              and intuitive interface designed for an enjoyable user experience.
            </li>
          </ul>
          <br />
          <h5> How It Works:</h5>
          <strong>You must have Spotify Premium Account. </strong>
          <br />
          Music.ant connects to the Spotify API display a wide range of tracks
          based on your search queries. Simply login to your Spotify account and
          type in the name of the song or artist you`re looking for, and
          Music.ant will do the rest. Click on any track to start playing it
          instantly using Spotify web player.
        </div>
      </div>
    </div>
  );

  // supposed to be responsive
  // return (
  //   <div className="container">
  //     <div className="row justify-content-center align-items-center fs-5 py-2">
  //       <div className="col-12 d-flex justify-content-center">
  //         <HorizontalScroll styleClasses="d-flex">
  //           {!newReleases ? (
  //             <div className="bg-white rounded p-3 mx-3 w-100 text-center">
  //               <img
  //                 src="/ant_logo1.png"
  //                 alt="logo"
  //                 className="img-fluid"
  //                 style={{ height: '70px', width: '70px' }}
  //               />
  //             </div>
  //           ) : (
  //             <>
  //               <div
  //                 style={{ zIndex: 10001, left: 0 }}
  //                 className="position-sticky d-flex flex-column align-items-center justify-content-center mt-2 p-3 bg-success me-3"
  //               >
  //                 <h4 className="text-center text-white">New Releases</h4>
  //               </div>
  //               {newReleases.map((track, index) => (
  //                 <div className="d-inline-block" key={index}>
  //                   <TrackMusicCard
  //                     track={track}
  //                     key={index}
  //                     selectTrack={selectTrack}
  //                   />
  //                 </div>
  //               ))}
  //             </>
  //           )}
  //         </HorizontalScroll>
  //       </div>
  //     </div>

  //     <div className="px-5 my-4">
  //       Welcome to <strong>Music.ant</strong>, your ultimate destination for
  //       searching and playing your favorite tracks seamlessly. Built with the
  //       latest web technologies, Music.ant leverages the power of the Spotify
  //       API and modern React frameworks to deliver a smooth and engaging music
  //       experience.
  //       <br />
  //       <br />
  //       <h5>Key Features:</h5>
  //       <ul>
  //         <li>
  //           <strong>Track Search:</strong> Effortlessly search for songs,
  //           artists, and albums using the extensive Spotify music library.
  //         </li>
  //         <li>
  //           <strong>Instant Playback:</strong> Enjoy instant playback of tracks
  //           directly within the app.
  //         </li>
  //         <li>
  //           <strong>User-Friendly Interface:</strong> Navigate through a clean
  //           and intuitive interface designed for an enjoyable user experience.
  //         </li>
  //       </ul>
  //       <br />
  //       <h5>How It Works:</h5>
  //       <strong>You must have a Spotify Premium Account.</strong>
  //       <br />
  //       Music.ant connects to the Spotify API to display a wide range of tracks
  //       based on your search queries. Simply log in to your Spotify account and
  //       type in the name of the song or artist you’re looking for, and Music.ant
  //       will do the rest. Click on any track to start playing it instantly using
  //       the Spotify web player.
  //     </div>
  //   </div>
  // );
}

Home.propTypes = {
  accessToken: PropTypes.string,
  setAccessToken: PropTypes.func,
  setRefreshToken: PropTypes.func,
  setExpiresIn: PropTypes.func,
};
