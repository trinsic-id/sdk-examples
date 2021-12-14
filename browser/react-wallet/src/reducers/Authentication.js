import { LOGIN, LOGOUT } from '../actions';
// initialState
export const authentication = {
  loggedIn: false,
  user: {}
}

export default function authenticationReducer(state = authentication, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.profile
      })
    case LOGOUT:
      console.log("logging out")
      return Object.assign({}, state, {
        loggedIn: false,
        user: {}
      })
    default:
      return state;
  }
}
