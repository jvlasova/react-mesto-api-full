import React from "react";

const Popup = ({ isOpen, name, image_full, onClose, children }) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => document.removeEventListener("keydown", handleEscapeClose);
  }, [isOpen, onClose]);

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget && isOpen) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${name} ${image_full || ""} ${
        isOpen && "popup_opened"
      }`}
      onClick={handleOverlayClose}
    >
      {children}
    </div>
  );
};

export default Popup;
