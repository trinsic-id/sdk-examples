import { CREATE_CREDENTIAL_TEMPLATE, GET_CREDENTIAL_TEMPLATES } from '../actions';
// initialState
export const templates = {
  items: [],
  schema: {}
}

export default function templateReducer(state = templates, action) {
  switch (action.type) {
    case GET_CREDENTIAL_TEMPLATES:
      return Object.assign({}, state, {
        items: Array.isArray(action.items) ? action.items : []
      })
    case CREATE_CREDENTIAL_TEMPLATE:
      return Object.assign({}, state, {
        schema: action.response
      });
    default:
      return state;
  }
}
