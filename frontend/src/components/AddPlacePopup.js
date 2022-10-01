import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onCloseOverlay,
  onUpdatePlace,
  buttonText,
}) {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({});
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdatePlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleSubmit}
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
      <span className="title-error popup__text-error"></span>
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
      <span className="link-error popup__text-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
