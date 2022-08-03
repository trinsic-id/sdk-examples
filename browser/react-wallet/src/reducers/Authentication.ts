import { LOGIN, LOGOUT, VERIFY_EMAIL } from '../actions';
import {LoginResponse} from "@trinsic/trinsic";
// initialState
export const authentication = {
  loggedIn: false,
  user: {},
  profile: "",
  loginResponse: {},
}

export interface AuthenticationAction { type: string; user: {name: string, email: string}; profile?: any; loginResponse?: LoginResponse; }

export default function authenticationReducer(state = authentication, action: AuthenticationAction) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        user: action.user,
        profile: action.profile,
        loginResponse: action.loginResponse
      })
    case VERIFY_EMAIL:
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
