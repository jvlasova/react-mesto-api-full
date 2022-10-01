import React from "react";
import Popup from "./Popup";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
}) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <form name={name} className="popup__form" onSubmit={onSubmit}>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button
          type="submit"
          aria-label="Сохранить"
          className="popup__save-button"
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
