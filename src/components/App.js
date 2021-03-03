import React from "react";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import apiPraktikum from "../utils/api.js";
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
import { apiAuth } from "../utils/auth.js";
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
    apiPraktikum.getInitialCards()
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
    apiPraktikum.getProfileInfo()
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
    apiPraktikum.changeLikeCardStatus(card._id, !isLiked)
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

  const handleUpdateUser = ({ name, about }) => {
    apiPraktikum.setNewProfile({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterUser = ({ email, password }) => {
    apiAuth
      .register(email, password)
      .then(() => {
        setIsRegisterSuccess(!isRegisterSuccess);
        history.push("/mesto-react/sign-in");
      })
      .catch((error) => {
        console.log(error);
        setIsRegisterFail(!isRegisterFail);
      });
  };

  const handleAuth = ({ email, password }) => {
    apiAuth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);

        localStorage.setItem("email", email);

        //setUserEmail(email);
        tokenCheck();
      })
      .catch((error) => console.log(error));
  };

  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem("token");
    // проверим токен
    if (jwt) {
      apiAuth.getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/mesto-react/main");
        }
      })
      .catch(error => console.log(error));
    }
  };

  React.useEffect(() =>{
    tokenCheck();
  }, [])


  const handleUpdateAvatar = (link) => {
    apiPraktikum.setUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    apiPraktikum.postCardOnTheServer(newCard)
      .then((newElement) => {
        setCards([newElement, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
    // closeAllPopups();
  };

  const handleRemoveCard = (cardId) => {
    apiPraktikum.deleteCard(cardId)
      .then(() => {
        const newCards = cards.filter((r) => (r._id === cardId ? "" : r));
        setCards(newCards);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
    // closeAllPopups();
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
