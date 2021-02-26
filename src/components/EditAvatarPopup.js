import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const inputField = React.useRef(null)

    function handleSubmit(e) {
        e.preventDefault();

        const value = inputField.current.value;

        props.onUpdateAvatar({
            avatar: value /* Значение инпута, полученное с помощью рефа */,
        });
      
    }

    return (
        <PopupWithForm
            onClose={props.onClose}
            isOpen={props.isOpen ? "popup_opened" : ""}
            name="editing_photo_profile"
            title="Обновить аватар"
            // submitName="Сохранить"
            submitName={props.isRender ? 'Сохранение...' : 'Сохранить'}
            handleSubmit={handleSubmit}
            inputField={inputField}
        >
        <input
        type="text"
        id="profile-name"
        name="popup__name"
        className="popup__input popup__item_profile_name"
        minLength="2"
        placeholder="Ссылка на аватар"
        required
        ref={inputField}
      />   
      </PopupWithForm>
    );
}

export default EditAvatarPopup;
