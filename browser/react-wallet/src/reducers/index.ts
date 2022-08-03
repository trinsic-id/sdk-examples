import {combineReducers} from 'redux';
import templateReducer, {TemplateAction, templates} from './Templates';
import authenticationReducer, {authentication, AuthenticationAction} from './Authentication';
import walletReducer, {wallet, WalletAction} from './Wallet';
import credentialReducer, {CredentialAction, credentials} from './Credential';
import ecosystemReducer, {EcosystemAction, ecosystems} from './Ecosystems';
import {LOGOUT} from '../actions';

export const initialState = {
    templates,
    authentication,
    wallet,
    credentials,
    ecosystems
}


const appReducer = combineReducers({
    templates: templateReducer,
    authentication: authenticationReducer,
    wallet: walletReducer,
    credentials: credentialReducer,
    ecosystems: ecosystemReducer
})

export type ActionType = TemplateAction | AuthenticationAction | WalletAction | CredentialAction | EcosystemAction;

function rootReducer(state: any, action: ActionType) {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
}

export default rootReducer;
