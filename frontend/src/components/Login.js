import Header from "./Header";
import Form from "./Form";
import { useForm } from "../hooks/useForm";

function Login({ onLogin }) {
  const { values, handleChange } = useForm({ login: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.login || !values.password) {
      return;
    }
    onLogin({ values });
  }

  return (
    <div className="auth">
      <Header />
      <Form name="form" title="Войти" button="Войти" onSubmit={handleSubmit}>
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
    </div>
  );
}

export default Login;
