import React from "react";
import Header from "./Header";
import Form from "./Form";
import { useFormWithValidation } from "../hooks/useForm";

function Login({ onLogin }) {
  const { values, handleChange, resetFrom, errors } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.login || !values.password) {
      return;
    }
    onLogin({ values });
  }

  React.useEffect(() => {
    if (!onLogin) {
      resetFrom(onLogin, {}, true);
    }
  }, [onLogin, resetFrom]);

  return (
    <div className="auth">
      <Header />
      <Form name="form" title="Войти" button="Войти" onSubmit={handleSubmit}>
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
    </div>
  );
}

export default Login;
