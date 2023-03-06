import axios from 'axios';

export class TheGuardBackendServices {
  constructor () {
    this.backendSevicesEndpoint = process.env.BACKEND_SERVICE_ENDPOINT;
  }

  async getCoords(payload) {
    return await axios.post(`${this.backendSevicesEndpoint}/coords`, payload).then(res => {
      return res.data;
    });
  }

  async getServerStatus(payload) {
    return await axios.post(`${this.backendSevicesEndpoint}/server/ping`, payload).then(res => {
      return res.data;
    });
  }

  async getPresenceGroups(payload) {
    const url = `${this.backendSevicesEndpoint}/presence/${payload.name}?randomize=${payload.shuffled}`

    return await axios.get(url).then(res => {
      return res.data;
    });
  }

  async getRandomNumber() {
    return await axios.get(`${this.backendSevicesEndpoint}/games/random-number-generator`).then(res => {
      return res.data;
    });
  }
}
