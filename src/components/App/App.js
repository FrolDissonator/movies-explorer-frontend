import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import MenuPopup from '../MenuPopup/MenuPopup';

function App() {
  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <Main />
            <Footer />
            <MenuPopup />
          </>
        } />
        <Route path='/movies' element={
          <>
            <Header />
            <Movies />
            <Footer />
            <MenuPopup />
          </>
        } />
        <Route path='/saved-movies' element={
          <>
            <Header />
            <SavedMovies />
            <Footer />
            <MenuPopup />
          </>
        } />
        <Route path='/profile' element={
          <>
            <Header />
            <Profile />
            <MenuPopup />
          </>
        } />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
