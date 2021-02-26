import React from "react";

function InfoTooltip(props) {
  return (
    <div className={`infoToolTip ${props.isOpen ? 'infoToolTip_opened' : ''}`}>
      <div className="infoToolTip__container ">
        <button
          type="button"
          className="popup__close"
          aria-label="закрыть попап"
          onClick={props.onClose}
        ></button>
        <img className="infoToolTip__image" src={props.img} alt={props.alt} />
        <p className="infoToolTip__title">{props.title}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
