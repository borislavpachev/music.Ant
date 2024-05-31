import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import ErrorPage from './views/ErrorPage/ErrorPage';
import Profile from './views/Profile/Profile';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './contexts/AppContext';
import { ThemeContext } from './contexts/theme';
import { getUserData, refreshAccessToken } from './services/auth.service';
import { spotifyApi } from './services/spotify.service';
import toast, { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './views/Search/Search';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';

function App() {
  const [{ theme }] = useContext(ThemeContext);
  const [{ setSearch, currentlyPlayingTrack, setCurrentlyPlayingTrack }] =
    useContext(AppContext);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshing = localStorage.getItem('refreshToken');
    const expires = localStorage.getItem('expiresIn');

    if (!token) return;

    setAccessToken(token);
    setRefreshToken(refreshing);
    setExpiresIn(expires);
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    try {
      spotifyApi.setAccessToken(accessToken);
    } catch (error) {
      toast.error(error.message);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    getUserData(accessToken, handleLogout)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [accessToken]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      refreshAccessToken(refreshToken)
        .then((data) => {
          setAccessToken(data.access_token);
          setExpiresIn(data.expires_in);
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('expiresIn', data.expires_in);
        })
        .catch((error) => toast.error(error.message));
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setExpiresIn(null);
    setSearch('');
    setUser(null);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
  };

  return (
    <>
      <main className={`app bg-${theme.color} text-${theme.textColor}`}>
        <BrowserRouter>
          <Toaster />
          <Header user={user} logout={handleLogout} />
          {currentlyPlayingTrack && (
            <MusicPlayer
              uri={currentlyPlayingTrack}
              setTrack={setCurrentlyPlayingTrack}
            />
          )}
          <Routes>
            <Route
              index
              element={
                <Home
                  accessToken={accessToken}
                  setAccessToken={setAccessToken}
                  setRefreshToken={setRefreshToken}
                  setExpiresIn={setExpiresIn}
                />
              }
            />
            <Route
              path="/home"
              element={
                <Home
                  accessToken={accessToken}
                  setAccessToken={setAccessToken}
                  setRefreshToken={setRefreshToken}
                  setExpiresIn={setExpiresIn}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search accessToken={accessToken} logout={handleLogout} />
              }
            />

            <Route
              path="/profile"
              element={<Profile token={accessToken} logout={handleLogout} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
