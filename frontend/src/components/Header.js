import React, { useState } from "react";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ email, handleSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMain = useRouteMatch({ path: "/react-mesto-auth", exact: true });

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header
      className={`header
      ${isMenuOpen ? "header_menu-open" : ""}
      ${isMain ? "header_menu-close" : ""}`}
    >
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <Switch>
          <Route exact path="/react-mesto-auth">
            <button
              type="button"
              className="header__menu"
              aria-label="меню"
              onClick={toggleMenu}
            ></button>
            <div className="header__wrapper">
              <p className="header__email">{email}</p>
              <button className="header__button" onClick={handleSignOut}>
                Выйти
              </button>
            </div>
          </Route>
          <Route path="/react-mesto-auth/sign-up">
            <Link className="header__link" to="/react-mesto-auth/sign-in">
              Войти
            </Link>
          </Route>
          <Route path="/react-mesto-auth/sign-in">
            <Link className="header__link" to="/react-mesto-auth/sign-up">
              Регистрация
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
