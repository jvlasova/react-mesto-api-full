class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
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
      headers: {
        "Content-Type": "application/json"
    },
      credentials: 'include',
    })
    .then(this._handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
    },
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
      headers: {
        "Content-Type": "application/json"
    },
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
      headers: {
        "Content-Type": "application/json"
    },
      credentials: 'include',
    })
    .then(this._handleResponse)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        "Content-Type": "application/json"
    },
      credentials: 'include',
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`,{
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
    },
      credentials: 'include',
    })
    .then(this._handleResponse);
  }
}

const api = new Api({ baseUrl: 'https://api.jvlasova.mesto.nomorepartiesxyz.ru'})

export default api;
