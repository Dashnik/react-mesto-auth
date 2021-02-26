import React from "react";
import PopupWithForm from "./PopupWithForm";

function RemoveCardPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        
        props.onRemoveCard(`${props.cardId}`)
    }

    return (
    <PopupWithForm
            onClose={props.onClose}
            isOpen={props.isOpen ? "popup_opened" : ""}
            name="removing_card"
            title="Вы уверены?"
            removeCard='popup__title-remove'
            submitName="Да"
            handleSubmit={handleSubmit}
        >  
    </PopupWithForm>
    );
}

export default RemoveCardPopup;
