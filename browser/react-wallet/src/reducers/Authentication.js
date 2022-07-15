import { LOGIN, LOGOUT, VERIFY_EMAIL } from '../actions';
// initialState
export const authentication = {
  loggedIn: false,
  user: {},
  profile: {},
  challenge: new Uint8Array(),
  authToken: ""
}

export default function authenticationReducer(state = authentication, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        user: action.user,
        profile: action.profile,
        challenge: action.challenge
      })
    case VERIFY_EMAIL:
      debugger;
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.user,
        profile: action.profile,
        authToken: action.authToken
      })
    case LOGOUT:
      console.log("logging out")
      return Object.assign({}, state, {
        loggedIn: false,
        user: {},
        profile: {},
        challenge: new Uint8Array(),
        authToken: ""
      })
    default:
      return state;
  }
}
