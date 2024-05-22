import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import ErrorPage from './views/ErrorPage/ErrorPage';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './contexts/theme';
import About from './views/About/About';
import hash from './hash';
import { getUserData } from './services/auth.service';
import { spotifyApi } from './services/spotify.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [{ theme }] = useContext(ThemeContext);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let _token = hash.access_token;

    if (_token) {
      localStorage.setItem('spotifyToken', _token);
      window.location.hash = '';
    }

    const storedToken = localStorage.getItem('spotifyToken');
    if (storedToken) {
      _token = storedToken;
    }

    if (_token) {
      setToken(_token);
      getUserData(_token)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token);
  }, [token]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!token) return;
    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            artist: track.artists[0].name,
            trackName: track.name,
            uri: track.uri,
            albumCover: track.album.images[0].url,
          };
        })
      );
    });
  }, [search, token]);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('spotifyToken');
  };

  return (
    <>
      <main className={`app bg-${theme.color} text-${theme.textColor}`}>
        <BrowserRouter>
          <Toaster />
          <Header
            user={user}
            logout={handleLogout}
            search={search}
            setSearch={setSearch}
          />
          <Routes>
            <Route index element={<Home results={searchResults} />} />
            <Route path="/home" element={<Home results={searchResults} />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
