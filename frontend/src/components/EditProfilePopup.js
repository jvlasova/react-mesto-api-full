import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormWithValidation } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, resetFrom, errors, isValid } =
    useFormWithValidation();

  React.useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, true);
    }
  }, [currentUser, isOpen, resetFrom]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid || isLoading}
    >
      <input
        type="text"
        id="name"
        name="name"
        className="popup__input popup__input_type_name"
        value={values.name || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="40"
        required
      />
      <span className="name-error popup__text-error">{errors.name || ""}</span>
      <input
        type="text"
        id="about"
        name="about"
        className="popup__input popup__input_type_other"
        value={values.about || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="200"
        required
      />
      <span className="about-error popup__text-error">
        {errors.about || ""}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
