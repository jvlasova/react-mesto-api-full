import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({
  isOpen,
  onClose,
  onCloseOverlay,
  onUpdateUser,
  buttonText,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: "",
    description: "",
  });

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleSubmit}
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
      <span className="name-error popup__text-error"></span>
      <input
        type="text"
        id="description"
        name="description"
        className="popup__input popup__input_type_other"
        value={values.description || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="200"
        required
      />
      <span className="description-error popup__text-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
