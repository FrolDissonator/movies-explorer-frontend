import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  const location = useLocation();

  const shouldRenderHeaderAndFooter = !['/signup', '/signin'].includes(location.pathname);

  return (
    <div className='page'>
      {shouldRenderHeaderAndFooter && <Header />}
      <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
      </Routes>
      {shouldRenderHeaderAndFooter && <Footer />}
    </div>
  );
}

export default App;
