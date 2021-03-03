class Auth {
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

  register(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then((response) => {
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

export const apiAuth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});
