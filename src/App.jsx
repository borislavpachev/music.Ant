import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home/Home';
import ErrorPage from './views/ErrorPage/ErrorPage';
import { useContext } from 'react';
import { ThemeContext } from './contexts/theme';
import About from './views/About/About';

function App() {
  const [{ theme }] = useContext(ThemeContext);

  return (
    <>
      <main className={`app bg-${theme.color} text-${theme.textColor}`}>
        <BrowserRouter>
          <Header />
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
