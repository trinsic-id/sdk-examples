import {combineReducers} from 'redux';
import templateReducer, {TemplateAction, templates} from './Templates';
import authenticationReducer, {authentication, AuthenticationAction} from './Authentication';
import walletReducer, {wallet, WalletAction} from './Wallet';
import credentialReducer, {CredentialAction, credentials} from './Credential';
import {LOGOUT} from '../actions';

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

export type ActionType = TemplateAction | AuthenticationAction | WalletAction | CredentialAction;

function rootReducer(state: any, action: ActionType) {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
}

export default rootReducer;
