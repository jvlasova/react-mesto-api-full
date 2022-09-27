import React from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <Popup
      name="image_full"
      isOpen={isOpen}
      onClose={onClose}
      image_full="popup_full"
    >
      <div className="popup__container-image">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img
          src={card.link ? card.link : "#"}
          alt={card.name}
          className="popup__image-full"
        />
        <p className="popup__image-title">{card.name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
