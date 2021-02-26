import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
       className={`popup  ${card.isOpen ? "popup_opened" : ""}`}
      name="popupImage"
    >
      <div className='popup_type_image'>
        <div className='popup__image-container'>
          <button
          type="button"
          className="popup__close"
          aria-label="закрыть попап"
          onClick={onClose}
          />
          <img className="popup__image" src={card.imageSrc} alt={card.name} />
          <p className="popup__caption popup__caption_onBigImage">{card.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
