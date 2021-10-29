## Highg level overview
- App rendered on the server into  some div in the template // skeleton
- Rendered app sent to the users browser
- Browser renders HTML file on the screen, then loads client bundle
- Clinet bundle boots up // breathes in life
- We manually render the React app a second time into the 'same' div 
- React renders our app on the client side, and compares the new HTML to what already exists in the document
- React 'takes over' the existing render app, binds event handlers, etc


## With Router

- Browser requests '/users/'
- Express handler of 'app.ger('*')' responds
- Express sends down index.html
- Express sends down bundle.js
- React boots up, React Router boots up
- BrowserRouter looks at URL in address bar, renders some router
  
server --> static router

client --> browser router


## 4 Big Redux challenges

- Redux needs different configuration on browser vs server
- Aspects of authentication needs to be handled on server normally this is only on browser!
- Need some way to detect when all initial data load action creators are completed on server
- need state rehydration on the browser


## Data being fetched and renders in browser

- Entire app rendered
- -----------------------> response sent back to the browser before any data is being fetched at the server
- UserList 'componentDidMount'
- Call 'fetchUsers'
- Make API request (and wait for response)
- get list of users
- list of users caught by reducer
- UserList component renders, shows users


## call api's on the server solution

- figure out what components would have rendered (based on URL)
- call a 'loadData' method attached to each of those components (wait for response)
- somehow detect all requests are complete
- render the app with the collected data
- send result to browser


## What's happening now on the client side

- Server Redux fetched data | reduxState = { users: [ { name: 'bill'}, ...]}
- Page rendered on server
- Page HTML send to browser
- Client bundle.js sent to browser
- Bundle creates its client side redux store
- Page rendered with store from client side redux | reduxState = {users:[]}


`Look for xss attack, insted of JSON.stringify use serialize intead`


