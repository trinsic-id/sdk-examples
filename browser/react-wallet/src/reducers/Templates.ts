import { CREATE_CREDENTIAL_TEMPLATE, GET_CREDENTIAL_TEMPLATES } from '../actions';
import {CreateCredentialTemplateResponse} from "@trinsic/trinsic/lib/browser";
// initialState
export const templates = {
  items: [],
  schema: {}
}

export interface TemplateAction  { type: string; items?: any; response?: CreateCredentialTemplateResponse; }

export default function templateReducer(state = templates, action:TemplateAction) {
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
