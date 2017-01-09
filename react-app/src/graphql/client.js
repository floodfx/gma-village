import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const prod = process.env.NODE_ENV === 'production'
var url = prod ? 'https://gma-village-graphql-dev-dot-gma-village.appspot.com/graphql' : 'http://localhost:8080/graphql'

class Client {
  constructor(url) {
    this.url = url;
  }

  set store (store) {
    store.subscribe(() => {
      // let previousAuth = this.auth;
      this.auth = store.getState().auth.cookie;
      // if(this.auth !== previousAuth) {
      //   console.log("auth changed", this.auth)
      // }
    });
  }

  get client() {
    var headers = {}
    if(this.auth) {
      headers = Object.assign(headers, {Authorization: `Bearer ${this.auth.ak_access_token}`});
    }
    return new Lokka({
      transport: new Transport(url, {credentials: false, headers})
    })
  }
}

const client = new Client(url);

export default client
