import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import {
  ERR_UNAUTHORIZED,
  MSG_UNAUTHORIZED,
  ERR_ALREADY_EXISTS,
  MSG_ALREADY_EXISTS,
  MSG_LOGIN_ERR,
  MSG_REG_ERR,
  PAGE_LOGIN,
  PAGE_REGISTER,
  PAGE_MOVIES,
  PAGE_SAVED_MOVIES,
  PAGE_PROFILE,
  PAGE_MAIN,
  PAGE_NOT_FOUND
} from "../../utils/constants";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [resultError, setResultError] = useState("");
  const location = useLocation();

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
          }
        })
        .catch((err) => {
          console.error(err);
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  };

  const handleResultError = (err) => {
    setResultError(err);
    if (err.includes(ERR_UNAUTHORIZED)) {
      setResultError(MSG_UNAUTHORIZED);
    } else if (err.includes(ERR_ALREADY_EXISTS)) {
      setResultError(MSG_ALREADY_EXISTS);
    } else {
      location.pathname === PAGE_LOGIN
        ? setResultError(MSG_LOGIN_ERR)
        : setResultError(MSG_REG_ERR);
    }
  };

  const handleRegister = (data, handleResultError) => {
    setIsLoading(true);
    mainApi
      .register(data.name, data.email, data.password)
      .then((res) => {
        handleLogin(data, handleResultError);
      })
      .catch((err) => {
        console.error(err);
        handleResultError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = (data, handleResultError) => {
    setIsLoading(true);
    mainApi
      .login(data.email, data.password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        checkToken(res.token);
        navigate(PAGE_MOVIES);
      })
      .catch((err) => {
        console.error(err);
        handleResultError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate(PAGE_LOGIN);
  };

  const getFilms = () => {
    setIsLoading(true);
    moviesApi
      .getFilm()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveMovie = (movie, handleServerLike) => {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        setSaveMovies((prev) => {
          return [...prev, res];
        });
        handleServerLike();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteMovie = (id, handleServerLike) => {
    const idForDelete = saveMovies.find((movie) => {
      return movie.movieId === id;
    })._id;
    mainApi
      .deleteMovie(idForDelete)
      .then((res) => {
        setSaveMovies((prev) => {
          console.log(saveMovies);
          console.log(
            prev.filter((movie) => {
              return movie._id !== idForDelete;
            })
          );
          return prev.filter((movie) => {
            return movie._id !== idForDelete;
          });
        });
        handleServerLike();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getSavedMovies = () => {
    setIsLoading(true);
    mainApi
      .getSaveMovies()
      .then((res) => {
        setSaveMovies(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path={PAGE_MAIN}
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
              path={PAGE_MOVIES}
              element={
                <ProtectedRouteElement loggedIn={loggedIn}>
                  <>
                    <Header />
                    <Movies
                      isLoading={isLoading}
                      movies={movies}
                      saveMovie={saveMovie}
                      deleteMovie={deleteMovie}
                      saveMovies={saveMovies}
                    />
                    <Footer />
                    <MenuPopup />
                  </>
                </ProtectedRouteElement>
              }
            />
            <Route
              path={PAGE_SAVED_MOVIES}
              element={
                <ProtectedRouteElement loggedIn={loggedIn}>
                  <>
                    <Header />
                    <SavedMovies
                      isLoading={isLoading}
                      saveMovie={saveMovie}
                      deleteMovie={deleteMovie}
                      saveMovies={saveMovies}
                    />
                    <Footer />
                    <MenuPopup />
                  </>
                </ProtectedRouteElement>
              }
            />
            <Route
              path={PAGE_PROFILE}
              element={
                <ProtectedRouteElement loggedIn={loggedIn}>
                  <>
                    <Header />
                    <Profile
                      onSignOut={handleSignOut}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                    <MenuPopup />
                  </>
                </ProtectedRouteElement>
              }
            />
            <Route path={PAGE_NOT_FOUND} element={<PageNotFound />} />
          </Route>
          <Route
            path={PAGE_REGISTER}
            element={
              <Register
                onSubmit={handleRegister}
                handleResultError={handleResultError}
                isLoading={isLoading}
                resultError={resultError}
              />
            }
          />
          <Route
            path={PAGE_LOGIN}
            element={
              <Login
                onSubmit={handleLogin}
                handleResultError={handleResultError}
                isLoading={isLoading}
                resultError={resultError}
              />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
