import React from "react";

function PopupWithForm(props) {

  return (
    <form
      className={`popup  ${props.isOpen}`}
      // className={`popup  ${props.isOpen}`}
      name={props.name}
      noValidate
      onSubmit={props.handleSubmit}
    >
      <div className={`popup__container popup_type_${props.name}`}>
        <div className='popup__container-inside'>
        <button
          type="button"
          className="popup__close"
          aria-label="закрыть попап"
          onClick={props.onClose}
        />
        <h2 className={`popup__title ${props.removeCard}`}>{props.title}</h2>
           {props.children} 
        <button type="submit" className="popup__submit popup__profile_submit" >
          {props.submitName}
        </button>
        </div>
      </div>
    </form>
  );
}

export default PopupWithForm;
