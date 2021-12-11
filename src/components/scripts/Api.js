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
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._response)
  }
  // --- Updating/Editing user profile info --- //
  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(
        name, 
        about
      )
    })
    .then(this._response)
  }
  // --- Adding new card --- //
  addCard(data) {
    console.log(data);
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(
        data.titleInput, 
        data.linkInput
      )
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
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT"
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
  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(
          avatar
      )
    })
    .then(this._response)
  }
}
