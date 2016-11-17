import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const prod = process.env.NODE_ENV === 'production'
var url = prod ? 'https://gma-village-graphql-dev-dot-gma-village.appspot.com/graphql' : 'http://localhost:8080/graphql'

const client = new Lokka({
  transport: new Transport(url, {credentials: false})
});

export default client
