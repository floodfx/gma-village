import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

var url = process.env.NODE_ENV === 'production' ? 'http://gma-village-graphql.appspot.com/graphql' : 'http://localhost:8080/graphql'
const client = new Lokka({
  transport: new Transport(url, {credentials: false}),

});

export default client
