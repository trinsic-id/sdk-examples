import { GET_CREDENTIAL_TEMPLATES } from '../actions';
// initialState
export const templates = []

export default function templateReducer(state = templates, action) {
  switch (action.type) {
    case GET_CREDENTIAL_TEMPLATES:
      return action.templates
    default:
      return state;
  }
}
