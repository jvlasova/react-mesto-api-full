class Api {
  constructor(optional) {
    this._baseUrl = optional.baseUrl;
    this._headers = optional.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Error: ${res.status}`);
	}

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,{
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._handleResponse);
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._handleResponse);
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`,{
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._handleResponse)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`,{
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: !isLiked ? "PUT" : "DELETE",
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`,{
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.jvlasova.mesto.nomorepartiesxyz.ru',
})

export default api;
