import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";

import Api from "../utils/api.js";
import {
  CurrentUserContext,
  CardsContext,
} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import RemoveCardPopup from "./RemoveCardPopup";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC
import { apiRegister } from "../utils/api";
import InfoTooltip from "./InfoTooltip";

import Success from "../images/Success.svg";
import Fail from "../images/Fail.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );

  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = React.useState(
    false
  );

  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: "",
    imageSrc: "",
  });

  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [currentRemoveCard, setCurrentRemoveCard] = React.useState([]);
  // const [isRender, setIsRender] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
  const [isRegisterFail, setIsRegisterFail] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    Api.getInitialCards()
      .then((data) => {
        setCards(
          data.map((item) => ({
            _id: item._id,
            link: item.link,
            name: item.name,
            likes: item.likes,
            owner: { _id: item.owner._id },
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    Api.getProfileInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /**Обработчики событий */
  const handleCardClick = (imageSrc, cardTitle) => {
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
      name: cardTitle,
      imageSrc: imageSrc,
    });
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));

        // Обновляем стейт
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    setIsRemoveCardPopupOpen(!isRemoveCardPopupOpen);
    setCurrentRemoveCard(card._id);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  // const handleRendering = () => {
  //   setIsRender(!isRender);
  //   console.log(isRender);
  // };

  const handleUpdateUser = ({ name, about }) => {
    Api.setNewProfile({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterUser = ({ email, password }) => {
    apiRegister
      .register(email, password)
      .then((res) => {
        if (res.status === 201) {
          setIsRegisterSuccess(!isRegisterSuccess);
          history.push("/mesto-react/sign-in");
        } else {
          setIsRegisterFail(!isRegisterFail);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAuth = ({ email, password, _id }) => {
    apiRegister
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);

        // отправляем запрос на роут аутентификации
        fetch("https://auth.nomoreparties.co/users/me", {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((res) => {
          console.log(res);
          console.log(data);
          console.log(email);
          console.log(_id);
          setLoggedIn(!loggedIn);
          history.push("/mesto-react/main");
          console.log(loggedIn);
        });
      })

      .catch((error) => console.log(error));
  };

  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      duckAuth.getContent(jwt).then((res) => {
        if (res) {
          // авторизуем пользователя
          this.setState(
            {
              loggedIn: true,
            },
            () => {
              // обернём App.js в withRouter
              // так, что теперь есть доступ к этому методу
              this.props.history.push("/ducks");
            }
          );
        }
      });
    }
  };

  // useEffect(() =>{
  //   setLoggedIn();
  // }, [])

  const handleUpdateAvatar = (link) => {
    Api.setUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    Api.postCardOnTheServer(newCard)
      .then((newElement) => {
        setCards([newElement, ...cards]);
      })
      .catch((error) => {
        console.log(error);
      });
    closeAllPopups();
  };

  const handleRemoveCard = (cardId) => {
    Api.deleteCard(cardId)
      .then(() => {
        const newCards = cards.filter((r) => (r._id === cardId ? "" : r));
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
    closeAllPopups();
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRemoveCardPopupOpen(false);
    setIsRegisterFail(false);
    setIsRegisterSuccess(false);

    setSelectedCard({ name: "", link: "", isOpen: false });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Switch>
            <Route path="/mesto-react/sign-in">
              <Login onLogin={handleAuth} />
            </Route>
            <Route path="/mesto-react/sign-up">
              <Register onRegister={handleRegisterUser} />
            </Route>
            <ProtectedRoute
              path="/mesto-react/main"
              loggedIn={loggedIn}
              component={Main}
              handleCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
            ></ProtectedRoute>
            <Route path="/mesto-react">
              {loggedIn ? (
                <Redirect to="/mesto-react/main" />
              ) : (
                <Redirect to="/mesto-react/sign-in" />
              )}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            onClose={closeAllPopups}
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            onCreateCard={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            // isRender={isRender}
          />
          <RemoveCardPopup
            onClose={closeAllPopups}
            isOpen={isRemoveCardPopupOpen}
            cardId={currentRemoveCard}
            onRemoveCard={handleRemoveCard}
          />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <InfoTooltip
            isOpen={isRegisterSuccess}
            onClose={closeAllPopups}
            img={Success}
            title="Вы успешно зарегистрировались!"
            alt="иконка успеха"
          />
          <InfoTooltip
            isOpen={isRegisterFail}
            onClose={closeAllPopups}
            img={Fail}
            title="Что-то пошло не так! Попробуйте ещё раз."
            alt="иконка ошибки"
          />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
