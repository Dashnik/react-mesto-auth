class Api {
  constructor(config) {
    /** тело конструктора*/
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  _getResponseData(value) {
    if (value.ok) {
      return value.json();
    } else {
      return Promise.reject(`Ошибка: ${value.status}`);
    }
  }

  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setNewProfile(profileInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(profileInfo),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  postCardOnTheServer(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(newCard),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(link),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(cardID) {
    return fetch(`${this.baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this.headers,
      })
        .then((res) => {
          return this._getResponseData(res);
        })
        .then((data) => {
          return data;
        });
    } else {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
      })
        .then((res) => {
          return this._getResponseData(res);
        })
        .then((data) => {
          return data;
        });
    }
  }

  register(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      return this._getResponseData(response);
    });
  }

  authorize(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  getContent(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((response) => {
      return this._getResponseData(response);
    });
  }
}

const apiPraktikum = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "62377db5-e458-4bf1-a2a6-d8b8f8bb8a60",
    "Content-Type": "application/json",
  },
});

export default apiPraktikum;


export const apiRegister = new Api({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
})


