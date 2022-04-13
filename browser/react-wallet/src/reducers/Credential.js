import { ISSUE_CREDENTIAL, SEND_CREDENTIAL, CLOSE_NOTIFICATION, CREATE_PROOF, VERIFY_PROOF, IS_VERIFYING } from '../actions';
// initialState
export const credentials = {
  signedCredential: "",
  credentialSent: false,
  proofId: "",
  proofDocument: {},
  verifying: true,
  isValid: false
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
    case CREATE_PROOF:
      return Object.assign({}, state, {
        proofId: action.itemId,
        proofDocument: action.document
      })
    case IS_VERIFYING:
      return Object.assign({}, state, {
        verifying: true
      })
    case VERIFY_PROOF:
      return Object.assign({}, state, {
        isValid: action.isValid,
        verifying: false
      })
    case CLOSE_NOTIFICATION: 
      return Object.assign({}, state, {
        credentialSent: false
      })
    default:
      return state;
  }
}
