import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home/Home';
import ErrorPage from './views/ErrorPage/ErrorPage';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './contexts/theme';
import About from './views/About/About';
import hash from './hash';
import { getUserData } from './services/auth.service';

function App() {
  const [{ theme }] = useContext(ThemeContext);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

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
      getUserData(_token).then((data) => {
        setUser(data);
      });
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('spotifyToken');
  };

  return (
    <>
      <main className={`app bg-${theme.color} text-${theme.textColor}`}>
        <BrowserRouter>
          <Header user={user} logout={handleLogout} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
