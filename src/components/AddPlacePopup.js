import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleChange = (e) => {

     e.target.name === 'popup__name' ? setName(e.target.value) : '';
     e.target.name === 'popup__description' ? setLink(e.target.value) : '';

  };

  function handleSubmit(e) {
    /**  Запрещаем браузеру переходить по адресу формы*/
    e.preventDefault();

    /** Передаём значения управляемых компонентов во внешний обработчик*/
    props.onCreateCard({
        name,
        link: link,
    });
    setName('');
    setLink('');
    
  }

  return (
    <PopupWithForm
        onClose={props.onClose}
        isOpen={props.isOpen ? 'popup_opened' : ''}
        name="new-cards"
        title="Новое место"
        submitName="Создать"
        handleSubmit={handleSubmit}
        >
        <input
        type="text"
        value={name}
        id="profile-name"
        name="popup__name"
        className="popup__input popup__item_profile_name"
        minLength="2"
        placeholder="Название"
        required
        onChange={handleChange}
      />   
      <input
        type="text"
        value={link}
        id="profile-job"
        name="popup__description"
        className="popup__input popup__item_profile_job"
        minLength="2"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
      />   
    </PopupWithForm>
    );
}

export default AddPlacePopup;
