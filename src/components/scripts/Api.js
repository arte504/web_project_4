export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // --- GET https://around.nomoreparties.co/v1/group-12/cards --- //
  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  // --- GET https://around.nomoreparties.co/v1/group-12/users/me --- //
  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  // --- POST https://around.nomoreparties.co/v1/group-12/cards --- //
  addCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({name,link})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  // --- DELETE https://around.nomoreparties.co/v1/group-12/cards/cardID --- //
  removeCard(cardID) {
    return fetch(this.baseUrl + "/cards/" + cardID, {
      headers: this.headers,
      method: "DELETE"
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

// --- Add/remove likes --- //
  // --- PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId --- //
  addLike(card) {
    return fetch(this.baseUrl + "/cards/likes/" + card.getId(), {
      headers: this.headers,
      method: "PUT"
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  // --- DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId --- //
  removeLike(card) {
    return fetch(this.baseUrl + "/cards/likes/" + card.getId(), {
      headers: this.headers,
      method: "DELETE"
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

// --- Editing Profile info --- //
  // --- PATCH https://around.nomoreparties.co/v1/groupId/users/me --- //
  updateUserInfo({ name, about }) {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
          name,
          about
        })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar({ avatar }) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({avatar})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
}