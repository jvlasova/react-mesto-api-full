const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth.error');

const { JWT_SECRET = 'secret' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    const err = new AuthError('Необходима авторизация');
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = auth;
