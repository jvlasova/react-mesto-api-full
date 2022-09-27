import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onUpdatePlace, isLoading }) {
  const currentCard = React.useContext({});
  const { values, handleChange, resetFrom, errors, isValid } =
    useFormWithValidation();

  React.useEffect(() => {
    if (!currentCard) {
      resetFrom(currentCard, {}, true);
    }
  }, [currentCard, isOpen, resetFrom]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdatePlace(values);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading ? "Сохранение..." : "Создать"}
      isDisabled={!isValid || isLoading}
    >
      <input
        type="text"
        id="title"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Название"
        onChange={handleChange}
        value={values.name || ""}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="title-error popup__text-error">{errors.name || ""}</span>
      <input
        type="url"
        id="link"
        name="link"
        className="popup__input popup__input_type_other"
        placeholder="Ссылка на картинку"
        onChange={handleChange}
        value={values.link || ""}
        required
      />
      <span className="link-error popup__text-error">{errors.link || ""}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
