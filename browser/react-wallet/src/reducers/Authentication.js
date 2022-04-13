import { LOGIN, LOGOUT, VERIFY_EMAIL } from '../actions';
// initialState
export const authentication = {
  loggedIn: false,
  user: {},
  profile: {},
  token: ""
}

export default function authenticationReducer(state = authentication, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        user: action.user,
        profile: action.profile,
        token: action.token
      })
    case VERIFY_EMAIL:
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.user,
        profile: action.profile,
        token: action.token
      })
    case LOGOUT:
      console.log("logging out")
      return Object.assign({}, state, {
        loggedIn: false,
        user: {},
        profile: {},
        token: ""
      })
    default:
      return state;
  }
}
