import React from "react";

function Form({ title, button, onSubmit, children }) {
  return (
    <div className="auth__container">
      <form name="form" onSubmit={onSubmit}>
        <h2 className="auth__title">{title}</h2>
        {children}
        <button className="auth__register-button" type="submit">
          {button}
        </button>
      </form>
    </div>
  );
}

export default Form;
