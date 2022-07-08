import { LOGIN, LOGOUT, VERIFY_EMAIL } from '../actions';
// initialState
export const authentication = {
  loggedIn: false,
  user: {},
  profile: "",
  loginResponse: {},
}

export default function authenticationReducer(state = authentication, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        user: action.user,
        profile: action.profile,
        loginResponse: action.loginResponse
      })
    case VERIFY_EMAIL:
      debugger;
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.user,
        profile: action.profile
      })
    case LOGOUT:
      console.log("logging out")
      return Object.assign({}, state, {
        loggedIn: false,
        user: {},
        profile: {}
      })
    default:
      return state;
  }
}
