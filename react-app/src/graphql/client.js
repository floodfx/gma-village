import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const client = new Lokka({
  transport: new Transport('http://localhost:8080/graphql', {credentials: false}),

});

export default client
