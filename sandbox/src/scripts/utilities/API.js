import axios from 'axios';

class API {
  
  constructor({ base }) { this.base = base }

  get(endpoint, params = {}) {
    return axios
      .get(`${ this.base }${endpoint}`, { params })
      .then(({ data }) => data)
      .catch(error => console.error(error));
  }

  post(endpoint, body = {}) {
    return axios
      .post(`${ this.base }${ endpoint }`, body)
      .then(({ data }) => data)
      .catch(error => console.error(error));
  }
}

export default API;
