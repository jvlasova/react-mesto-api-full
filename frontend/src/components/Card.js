import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__trash ${
    isOwn && "element__trash_active"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="element__container">
        <h2 className="element__title">{props.card.name}</h2>
        <div>
          <button
            type="button"
            aria-label="Нравится"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="Удалить"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}

export default Card;
