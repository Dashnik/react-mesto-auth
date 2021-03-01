import React from "react";
import Card from "./Card";
import { CurrentUserContext, CardsContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const currentCards = React.useContext(CardsContext);



  function handleClick(cardLink, cardName) {
    props.handleCardClick(cardLink, cardName);
  }

  return (
    <>
      <Header linkName='Выйти' 
        link='/mesto-react/sign-in' />
      <main className="content">
        <section className="profile">
          <div className="profile__photo_container">
            <img
              src={currentUser.avatar}
              className="profile__image"
              alt="Аватар пользователя"
            />
            <button
              type="button"
              className="profile__editingAvatar-icon"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-table">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-icon"
                onClick={props.onEditProfile}
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <div className="profile__rectangle">
            <button
              type="button"
              className="profile__addingCard-icon"
              onClick={props.onAddPlace}
            >
              {" "}
            </button>
          </div>
        </section>
        <section className="elements">
          {currentCards.map((card) => (
            <Card
              onCardClick={handleClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
              key={card._id}
              card={card}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;