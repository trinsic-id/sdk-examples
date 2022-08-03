import { CombinedState, combineReducers} from 'redux';
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

function rootReducer(state: CombinedState<{ templates: ({ items: never[]; schema: {}; } & { items: any; }) | ({ items: never[]; schema: {}; } & { schema: any; }); authentication: ({ loggedIn: boolean; user: {}; profile: string; loginResponse: {}; } & { user: any; profile: any; loginResponse: any; }) | ({ loggedIn: boolean; user: {}; profile: string; loginResponse: {}; } & { loggedIn: boolean; user: any; profile: any; }); wallet: { insertingItem: boolean; items: any[]; } & { items: any; }; credentials: { signedCredential: string; credentialSent: boolean; } & { signedCredential: any; }; ecosystems: ({ currentEcosytem: { name: string; }; } & { currentEcosytem: any; }) | ({ currentEcosytem: { name: string; }; } & { currentEcosytem: any; }); }> | undefined, action: ActionType) {
  if (action.type === LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
}

export default rootReducer;
