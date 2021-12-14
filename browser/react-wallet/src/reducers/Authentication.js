import { LOGIN, LOGOUT } from '../actions';
// initialState
export const authentication = {
  loggedIn: false,
  user: {}
}

export default function templateReducer(state = templates, action) {
  switch (action.type) {
    case GET_CREDENTIAL_TEMPLATES:
      return action.templates
    default:
      return state;
  }
}
