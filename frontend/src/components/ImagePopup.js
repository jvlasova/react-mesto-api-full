import React from "react";

function ImagePopup({ card, onClose }) {
  const onCloseOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_full ${card.link && "popup_opened"}`}
      onClick={onCloseOverlay}
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
    </div>
  );
}

export default ImagePopup;
