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

### useSession

- import from 'next-auth/react'
- retrieve session details using,
  const { data: session, status } = useSession(); //v4

  - second parameter 'status' has 3 states

  1. loading 2. authenticated 3. unauthenticated

  const [session, loading] = useSession(); //v3

### getSession

- can be imported in both client & server side code
- call getSession() method to check session exist or not
- in server-side, we can implement getServerSideProps to check the session, if there is no session exist, do a redirect instead of adding props as session.
- by implementing this server-side logic we can avoid the page loading in client-side [client pages will flash and then move to the login page, if no session exist]

- we can prevent from redirecting to login page if the user in already login and authenticated. [implemented in Auth page]

- by implementing sessionProvider in \_app.js, we can avoid the call to server for session if the user is already login & authenticated. ie we can pass the available session variable to the new requested page using this sessionProvider.
