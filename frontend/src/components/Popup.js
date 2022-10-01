import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const onCloseOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={onCloseOverlay}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
