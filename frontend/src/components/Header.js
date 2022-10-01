import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ email, handleSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      {/* расширение Prettier все равно оставил <Switch> на этом же месте */}
      <Switch>
        <Route exact path="/">
          <div className="header__user">
            <p className="header__email">{email}</p>
            <button className="header__button" onClick={handleSignOut}>
              Выйти
            </button>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
