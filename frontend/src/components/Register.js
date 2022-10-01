import Header from "./Header";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";
import Form from "./Form";

function Register({ onRegister }) {
  const { values, handleChange } = useForm({ login: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ values });
  }

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
          value={values.login}
          onChange={handleChange}
          required
        />
        <input
          className="auth__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          required
        />
      </Form>
      <p className="auth__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="auth__text">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
