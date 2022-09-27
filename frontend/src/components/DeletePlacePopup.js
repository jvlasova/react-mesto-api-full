import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ card, isOpen, onClose, isLoading, onDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDelete(card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading ? "Удаление..." : "Да"}
    ></PopupWithForm>
  );
}

export default DeletePlacePopup;
