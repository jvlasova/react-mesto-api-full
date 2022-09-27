import React from "react";
import Header from "./Header";
import { useFormWithValidation } from "../hooks/useForm";
import { Link } from "react-router-dom";
import Form from "./Form";

function Register({ onRegister }) {
  const { values, handleChange, resetFrom, errors } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ values });
  }

  React.useEffect(() => {
    if (!onRegister) {
      resetFrom(onRegister, {}, true);
    }
  }, [onRegister, resetFrom]);

  return (
    <div className="auth">
      <Header />
      <Form
        name="register"
        title="Регистрация"
        button="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <input
          className="auth__input"
          name="login"
          type="text"
          placeholder="Email"
          value={values.login || ""}
          onChange={handleChange}
          required
        />
        <span className="login-error popup__text-error">
          {errors.login || ""}
        </span>
        <input
          className="auth__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <span className="password-error popup__text-error">
          {errors.password || ""}
        </span>
      </Form>
      <p className="auth__text">
        Уже зарегистрированы?{" "}
        <Link to="/react-mesto-auth/sign-in" className="auth__text">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
