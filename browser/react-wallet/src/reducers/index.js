import { combineReducers } from 'redux';
import templateReducer, { templates } from './Templates';
import authenticationReducer, { authentication} from './Authentication';
import walletReducer, { wallet } from './Wallet';
import credentialReducer, { credentials } from './Credential';
import { LOGOUT } from '../actions';

export const initialState = {
  templates,
  authentication,
  wallet,
  credentials
}


const appReducer = combineReducers({
  templates: templateReducer,
  authentication: authenticationReducer,
  wallet: walletReducer,
  credentials: credentialReducer
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
}

export default rootReducer;
