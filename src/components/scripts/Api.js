export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // === Getting info from server === //
  // --- Get card list from the server --- //
  getCardList() {
    return (
      fetch(this._baseUrl + "/cards", {
        headers: this._headers,
      })
        .then(function (res) {
          if (res.ok) {
            return res.json().then((data) => {
              return data;
            });
          } else {
            Promise.reject("Error!" + res.statusText);
          }
        })
    );
  }
  // --- Get user info from the server --- //
  getUserInfo() {
    return (
      fetch(this._baseUrl + "/users/me", {
        headers: this._headers,
      })
        .then((res) =>
          res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
        )
    );
  }
  // --- Check if all info fetched --- //
  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  // === Adding/Removing/Editing === //
  // --- Adding new card --- //
  addCard(data) {
    const {name, link} = data;
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject("Error!" + res.statusText);
      }
    });
  }
  // --- Removing a card --- //
  removeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
    );
  }
  // --- Like a card --- //
  likeCard(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject("Error!" + res.statusText);
      }
    });
  }
  // --- Unlike a card --- //
  unlikeCard(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
    );
  }
  // --- Setting user profile info --- //
  setUserInfo( userInfo ) {
    const { name, job } = userInfo;
    return (
      fetch(this._baseUrl + "/users/me", {
        headers: this._headers,
        method: "PATCH",
        body: JSON.stringify({
          name,
          job,
        }),
      })
        .then((res) => {
          return res.ok
            ? res.json()
            : Promise.reject("Error!" + res.statusText + res.status);
        })
    );
  }
  // --- Setting user profile avatar --- //
  setUserAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error!" + res.statusText)
    );
  }
  // --- Updating/Editing user profile info --- //
  updateUserInfo(userInfo) {
    const { name, job } = userInfo;
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        job,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject("Error!" + res.statusText);
    });
  }
}
