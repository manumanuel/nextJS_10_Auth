## Authentication mechanisms

1. server side sessions
2. authentication tokens

### Server side sessions

- store a unique identifier on server, send same identifier to client
- client send identifier along with requests to protected resources
- after the validation at server-side, it will respond

### Authentication tokens

- create (but not store) permission token on server, send token to client
- client send token along with requests to protected resources.
- SPAs works with tokens instead of sessions
- Backend APIs work in a stateless way [don't care about the connected clients]
- In other words, servers don't save information about the authenticated clients,
  instead client should get information, that allows them to prove their authentication
  eg: JWT tokens

### jwt tokens

- main parts

1. Issuer data [automatically added]
2. Custom data [user data]
3. Secret signing key

### Add package

- next-auth [npm install next-auth]
- for encryption and checking add package bcryptjs [npm install bcryptjs]
