import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar">
          <button
            type="button"
            aria-label="Изменить_аватар"
            className="profile__avatar-button"
            onClick={onEditAvatar}
          ></button>
          <img
            id="image"
            src={currentUser.avatar}
            alt="Изображение профиля"
            className="profile__image"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button
            type="button"
            aria-label="Редактировать"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__add-button profile__add-button-pluse"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="Карточки места России">
        {cards.map((card) => (
          <Card
            key={card._id}
            user={currentUser}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
