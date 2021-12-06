class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // +++++ Fetching +++++ //
  // --- Fetch InitialCards from the server --- //
  getInitialCards() {
    return firstCall(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  // --- Fetch UserInfo from the server --- //
  getUserInfo() {
    return firstCall(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  // +++++ Adding/Editing/Removing data +++++ //
  // ===== Profile ===== //
  // --- Set/Update user avatar --- //
  setUserAvatar(data) {
    return firstCall(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      })
    });
  }

  // --- Set/Update user info --- //
  sendNewData(profile) {
    return firstCall(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: profile.name,
        job: profile.job,
      }),
    });
  }

  // ===== Cards ===== //
  // --- Creating a new card --- //
  createNewCard(card) {
    return firstCall(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  // --- Removing/Deleting card --- //
  removeCard(cardId) {
    return firstCall(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // --- Add like to a card --- //
  addLike(cardId) {
    return firstCall(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  // --- Remove like from a card --- //
  removeLike(cardId) {
    return firstCall(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

}

export const api = new Api("https://around.nomoreparties.co/v1/group-12", {
  authorization: "709a0d9d-db06-4890-a594-b07e7309a353",
  "Content-Type": "application/json"
});

console.log(api);

const firstCall = (url, headers) => {
    return fetch(url, headers).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`ERROR: ${res.statusText}`);
    });
  };