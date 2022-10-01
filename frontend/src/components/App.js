import React from "react";
import ProtectedRoute from "./ProtectedRouter";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import Api from "../utils/Api";
import * as AuthApi from "../utils/AuthApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCards, setCurrentCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [selectedCardOpen, setSelectedCardOpen] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  //const [isStatusRegister, setIsStatusRegister] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      Api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
      Api.getCardList()
        .then((data) => {
          setCurrentCards(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  function handleLoadingButton() {
    isLoading ? setIsLoading(true) : setIsLoading(false);
  }

  function handleInfoTooltipOpen(outcome) {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: true, ok: outcome });
  }

  function handleCardSelected(card) {
    setSelectedCard(card);
    setSelectedCardOpen(true);
  }

  function handleUpdateUserOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceSubmitOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateAvatarOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleChecktoken() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    AuthApi.checkToken(jwt)
      .then((values) => {
        setEmail(values.data.email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    handleChecktoken();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  function handleLogin({ values }) {
    AuthApi.authorize({ values })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setEmail(values.login);
          setLoggedIn(true);
          history.push("/");
          handleInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        handleInfoTooltipOpen(false);
        console.log(err);
      });
  }

  function handleRegister({ values }) {
    AuthApi.register({ values })
      .then((res) => {
        if (res) {
          handleInfoTooltipOpen(true);
          history.push("/");
        }
      })
      .catch((err) => {
        handleInfoTooltipOpen(false);
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    Api.changeLikeCardStatus(card._id, !isLiked ? "PUT" : "DELETE")
      .then((newCard) => {
        setCurrentCards((currentCards) => {
          return currentCards.map((c) => {
            return c._id === card._id ? newCard : c;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCurrentCards((currentCard) => {
          return currentCard.filter((c) => {
            return c._id !== card._id;
          });
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    Api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    Api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    Api.addCard(data)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Header}
            email={email}
            handleSignOut={handleSignOut}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={currentCards}
              onEditProfile={handleUpdateUserOpen}
              onEditAvatar={handleUpdateAvatarOpen}
              onAddPlace={handleAddPlaceSubmitOpen}
              onCardClick={handleCardSelected}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Footer}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            handleLoadingButton={handleLoadingButton}
            buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            handleLoadingButton={handleLoadingButton}
            buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdatePlace={handleAddPlaceSubmit}
            handleLoadingButton={handleLoadingButton}
            buttonText={isLoading ? "Сохранение..." : "Создать"}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={selectedCardOpen}
            onClose={closeAllPopups}
          />
          <InfoTooltip outcome={isInfoTooltip} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
