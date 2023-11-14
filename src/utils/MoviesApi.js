class MoviesApi {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    checkResponse(response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  
    getFilm() {
      return fetch(`${this.baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(this.checkResponse);
    }
}
  
const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');
  
export default moviesApi;