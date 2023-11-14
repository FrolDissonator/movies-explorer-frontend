class MainApi {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    checkResponse(response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  
    register(name, email, password) {
      return fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })
        .then(this.checkResponse);
    }
  
    login(email, password) {
      return fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
        .then(this.checkResponse)
        .then((data) => {
          if (data.token) {
            localStorage.setItem('jwt', data.token);
            return data;
          }
        });
    }
  
    checkToken() {
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(this.checkResponse);
    }

    getUserInfo() {
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/users/me`, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(this.checkResponse);
    }
  
    setUserInfo(name, email) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      })
        .then(this.checkResponse);
    }
}
  
const mainApi = new MainApi('https://api.movies.dissonator.nomoredomainsrocks.ru');
  
export default mainApi;