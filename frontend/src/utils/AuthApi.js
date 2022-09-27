export const BASE_URL = 'https://auth.nomoreparties.co';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const register = ({ values }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ 
      'email': values.login,
      'password': values.password
    })
  })
  .then((res => handleResponse(res)));
}

export const authorize = ({ values }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ 
      email: values.login,
      password: values.password
    })
  })
  .then((res => handleResponse(res)));
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      method: 'GET',
      ...headers,
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res => handleResponse(res)));
}
