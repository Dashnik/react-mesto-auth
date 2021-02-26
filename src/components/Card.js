import React from "react";
import trashLogo from "../images/Trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__delete-button ${isOwn ? "" : "card__delete-button_hidden"
    }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((id) => id._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${isLiked ? "card__like_active" : ""
    }`;

  function handleClick() {
    onCardClick(card.link, card.name);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card" id={card._id}>
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <img
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        src={trashLogo}
        alt="Иконка удаления карточки в виде мусорки"
      />
      <div className="card__body">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="card__counter-like">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;