import { combineReducers } from 'redux';
import templateReducer, { templates } from './Templates';
import authenticationReducer, { authentication} from './Authentication';
import walletReducer, { wallet } from './Wallet';

export const initialState = {
  templates,
  authentication,
  wallet
}


const rootReducer = combineReducers({
  templates: templateReducer,
  authentication: authenticationReducer,
  wallet: walletReducer
})

export default rootReducer;
