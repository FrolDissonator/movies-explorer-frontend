import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import MenuPopup from "../MenuPopup/MenuPopup";
import CurrentUserContext from "../../context/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    checkToken(jwt);
    getFilms();
    getSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkToken = (jwt) => {
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
            navigate("/movies");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
        });
    }
  };

  const handleRegister = (data) => {
    mainApi
      .register(data.name, data.email, data.password)
      .then((res) => {
        navigate("/movies");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = (data) => {
    mainApi
      .login(data.email, data.password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        checkToken(res.token);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/signin");
  };

  const getFilms = () => {
    setIsLoading(true);
    moviesApi.getFilm()
    .then((res) => {
      setMovies(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const saveMovie = (movie) => {
    mainApi.saveMovie(movie)
    .then((res) => {
      console.log(res)
      setSaveMovies((prev) => {
        return [ ...prev, res ]
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const deleteMovie = (id) => {
    const idForDelete = saveMovies.find((movie) => {
      return movie.movieId === id
    })._id
    mainApi.deleteMovie(idForDelete)
    .then((res) => {
      console.log(res)
      setSaveMovies((prev) => {
        return prev.filter((movie) => {
          return movie._id !== idForDelete
        })
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const getSavedMovies = () => {
    setIsLoading(true);
    mainApi.getSaveMovies()
    .then((res) => {
      console.log(res)
      setSaveMovies(res)
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
                <Footer />
                <MenuPopup />
              </>
            }
          />
          <Route>
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement loggedIn={loggedIn}>
                  <>
                    <Header />
                    <Movies isLoading={isLoading} movies={movies} saveMovie={saveMovie} deleteMovie={deleteMovie} saveMovies={saveMovies} />
                    <Footer />
                    <MenuPopup />
                  </>
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement loggedIn={loggedIn}>
                    <>
                      <Header />
                      <SavedMovies isLoading={isLoading} saveMovie={saveMovie} deleteMovie={deleteMovie} saveMovies={saveMovies} />
                      <Footer />
                      <MenuPopup />
                    </>
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement loggedIn={loggedIn}>
                <>
                  <Header />
                  <Profile onSignOut={handleSignOut} />
                  <MenuPopup />
                </>
                </ProtectedRouteElement>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route
            path="/signup"
            element={<Register onSubmit={handleRegister} />}
          />
          <Route path="/signin" element={<Login onSubmit={handleLogin} />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
