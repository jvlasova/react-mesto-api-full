const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth.error');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (e) {
    const err = new AuthError('Необходима авторизация');
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = auth;
