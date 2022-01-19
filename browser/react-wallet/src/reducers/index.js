import { combineReducers } from 'redux';
import templateReducer, { templates } from './Templates';
import authenticationReducer, { authentication} from './Authentication';
import walletReducer, { wallet } from './Wallet';
import credentialReducer, { credentials } from './Credential';

export const initialState = {
  templates,
  authentication,
  wallet,
  credentials
}


const rootReducer = combineReducers({
  templates: templateReducer,
  authentication: authenticationReducer,
  wallet: walletReducer,
  credentials: credentialReducer
})

export default rootReducer;
