import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  const handleChange = (e) => {

    e.target.name === 'popup__name' ? setName(e.target.value) : ''

    e.target.name === 'popup__description' ? setDescription(e.target.value) : ''

  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen ? "popup_opened" : ""}
      name="edit-user-profile"
      title="Редактировать профиль"
      submitName="Сохранить"
      handleSubmit={handleSubmit}
    >
      <input
        type="text"
        value={name}
        id="profile-name"
        name="popup__name"
        className="popup__input popup__item_profile_name"
        minLength="2"
        maxLength="40"
        placeholder={'Имя'}
        required
        onChange={handleChange}
      />
      <input
        type="text"
        value={description}
        id="profile-job"
        name="popup__description"
        className="popup__input popup__item_profile_job"
        minLength="2"
        maxLength="40"
        placeholder={'Вид деятельности'}
        required
        onChange={handleChange}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
