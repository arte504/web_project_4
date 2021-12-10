export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }
  // --- Global API response method --- //
  _response(res) {
    return res.ok
    ? res.json()
    : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
  }
  // --- Get card list from the server --- //
  getCardList() {
    return (
      fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(this._response)
    );
  }
  // --- Get user info from the server --- //
  getUserInfo() {
    return (
      fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._response)
    );
  }
  // --- Updating/Editing user profile info --- //
  updateUserInfo(userInfo) {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(userInfo)
    })
    .then(this._response)
  }
  // --- Adding new card --- //
  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(cardData)
    })
    .then(this._response)
  }
  // --- Removing a card --- //
  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE"
    })
    .then(this._response)
  }
  // --- Like a card --- //
  likeCard(cardId, userData) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
      body: JSON.stringify(userData)
    })
    .then(this._response)
  }
  // --- Unlike a card --- //
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}` , {
      headers: this._headers,
      method: "DELETE"
    })
    .then(this._response)
  }
  // --- Setting user profile avatar --- //
  updateUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(avatar)
    })
    .then(this._response)
  }
}
