import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [values, setValues] = React.useState({});

  const handleChange = (e) => {

    const target = e.target;
    const name = target.name;
    const value = target.value;

    setValues({...values,
    [name]: value
    })

  };

  function handleSubmit(e) {
    /**  Запрещаем браузеру переходить по адресу формы*/
    e.preventDefault();

    /** Передаём значения управляемых компонентов во внешний обработчик*/
      props.onCreateCard({
       name: values.popup__name,
        link: values.popup__description,
    });
 
    
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
       // id="profile-name"
        name="popup__name"
        className="popup__input popup__item_profile_name"
        minLength="2"
        placeholder="Название"
        required
        onChange={handleChange}
      />   
      <input
        type="text"
        //id="profile-job"
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
