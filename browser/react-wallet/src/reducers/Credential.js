import { ISSUE_CREDENTIAL, SEND_CREDENTIAL, CLOSE_NOTIFICATION } from '../actions';
// initialState
export const credentials = {
  signedCredential: "",
  credentialSent: false
}

export default function credentialReducer(state = credentials, action) {
  switch (action.type) {
    case ISSUE_CREDENTIAL:
      return Object.assign({}, state, {
        signedCredential: action.credential
      })
    case SEND_CREDENTIAL:
      return Object.assign({}, state, {
        credentialSent: true
      })
    case CLOSE_NOTIFICATION: 
      return Object.assign({}, state, {
        credentialSent: false
      })
    default:
      return state;
  }
}
