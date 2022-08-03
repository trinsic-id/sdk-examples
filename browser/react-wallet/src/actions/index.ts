import {Dispatch} from "redux";
import {AuthenticationAction} from "../reducers/Authentication";
import {
  AccountProfile,
  CreateCredentialTemplateRequest,
  CreateEcosystemRequest,
  Ecosystem,
  InsertItemRequest,
  IssueFromTemplateRequest,
  LoginRequest,
  LoginResponse,
  SearchCredentialTemplatesRequest,
  SendRequest,
  ServiceOptions,
  TrinsicService
} from "@trinsic/trinsic/lib/browser";
import {TemplateAction} from "../reducers/Templates";
import {TemplateField} from "@trinsic/trinsic/lib/src/proto/services/verifiable-credentials/templates/v1/templates";
import {WalletAction} from "../reducers/Wallet";
import {CredentialAction} from "../reducers/Credential";
import {EcosystemAction} from "../reducers/Ecosystems";

const serviceOptions = ServiceOptions.fromPartial({serverEndpoint:"dev-internal.trinsic.cloud"});
const service = new TrinsicService(serviceOptions);

export const ERROR = 'ERROR';

export interface State { (): any; new(): any; authentication: {
    user: {name: string, email: string};
    challenge: Uint8Array;
    (): any; new(): any; profile: any; }; }

function getProfileFromState(getState: () => State) {
  const profileObject = getState().authentication.profile;
  return AccountProfile.fromPartial(profileObject);
}

export const LOGIN = 'LOGIN';

export function login(email: string, name: string) {
  return async (dispatch: Dispatch<AuthenticationAction>) => {

    const loginResponse: LoginResponse = await service.account().login(
        LoginRequest.fromPartial({
          email,
        })
    );

    dispatch({
      type: LOGIN,
      user: {name, email},
      profile: undefined,
      loginResponse: loginResponse
    })
  }
}

export const VERIFY_EMAIL = 'VERIFY_EMAIL';

export function verifyEmail(securityCode: string) {
  return async (dispatch: Dispatch<AuthenticationAction>, getState: () => State) => {
    const auth = getState().authentication;
    const profile = getProfileFromState(getState);

    const authToken = await service.account().loginConfirm(auth.challenge, securityCode);

    dispatch({
      type: VERIFY_EMAIL,
      user: auth.user,
      profile: Object.assign({}, profile, {authToken: authToken}),
    })
  }
}

export const LOGOUT = 'LOGOUT';

export function logout() {
  localStorage.clear();
  return {
    type: LOGOUT
  }
}


export const GET_CREDENTIAL_TEMPLATES = 'GET_CREDENTIAL_TEMPLATES';

export function getCredentialTemplates() {
  return async (dispatch : Dispatch<TemplateAction>, getState: () => State) => {
    let request = SearchCredentialTemplatesRequest.fromPartial({
      query: "select * from c order by c.name"
    });
    let response = await service.template().search(request);
    let items = JSON.parse(response.itemsJson);

    dispatch({
      type: GET_CREDENTIAL_TEMPLATES,
      items: items
    });
  }
}

export const CREATE_CREDENTIAL_TEMPLATE = 'CREATE_CREDENTIAL_TEMPLATE';

export function createCredentialTemplate(name: string, fields: {[key: string]: TemplateField;}) {
  return async (dispatch : Dispatch<TemplateAction>, getState: () => State) => {
    const request = CreateCredentialTemplateRequest.fromPartial({
      name: name,
      fields: fields
    });

    let response = await service.template().create(request);

    dispatch({
      type: CREATE_CREDENTIAL_TEMPLATE,
      response
    })
  }
}

export const GET_WALLET_ITEMS = 'GET_WALLET_ITEMS';

export function getWalletItems() {
  return async (dispatch: Dispatch<WalletAction>, getState: () => State) => {
    let response = await service.wallet().search();
    // let items = response.getItemsList().map(item => item.getJsonStruct().toJavaScript());
    // items = items.map(item => JSON.parse(Object.values(item.data).join('')))
    let items = response.items.map(item => JSON.parse(JSON.parse(item).data));

    dispatch({
      type: GET_WALLET_ITEMS,
      items: items
    })
  }
}

export const INSERTING_WALLET_ITEM = 'INSERTING_WALLET_ITEM';
export const INSERTED_WALLET_ITEM = 'INSERTED_WALLET_ITEM';

export function insertWalletItem(item: any) {
  return async (dispatch: Dispatch<WalletAction>, getState: () => State) => {
    dispatch({
      type: INSERTING_WALLET_ITEM
    })

    let request = InsertItemRequest.fromPartial({
      itemJson: JSON.stringify(item)
    });

    let response = await service.wallet().insertItem(request);

    dispatch({
      type: INSERTED_WALLET_ITEM,
      itemId: response
    })
  }
}

export const SEND_CREDENTIAL = 'SEND_CREDENTIAL';

export function sendCredential(credential: any, email: string) {
  return async (dispatch: Dispatch<CredentialAction>, getState: () => State) => {
    let request = SendRequest.fromPartial({
      documentJson: JSON.stringify(credential),
      email: email
    })
    let response = await service.credential().send(request);

    dispatch({
      type: SEND_CREDENTIAL,
      response: response
    })
  }
}

export const ISSUE_CREDENTIAL = 'ISSUE_CREDENTIAL';

export function issueCredential(templateId: string, values: any) {
  return async (dispatch: Dispatch<CredentialAction>, getState: () => State) => {
    let request = IssueFromTemplateRequest.fromPartial({
      templateId: templateId,
      valuesJson: JSON.stringify(values)
    });

    let response = await service.credential().issueFromTemplate(request);

    dispatch({
      type: ISSUE_CREDENTIAL,
      credential: response.documentJson
    });
  }
}

export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';

export function closeNotification() {
  return {
    type: CLOSE_NOTIFICATION
  }
}

export const CREATE_ECOSYSTEM = 'CREATE_ECOSYSTEM';

export function createEcosystem(ecosystem: { ecosystemName?: string; description?: string; uri?: string; name?: string; email?: string; sms?: string; }) {
  return async (dispatch: Dispatch<EcosystemAction>, getState: () => State) => {
    let request = CreateEcosystemRequest.fromPartial({
      name: ecosystem.ecosystemName,
      description: ecosystem.description,
      uri: ecosystem.uri,
      details: {
        name: ecosystem.name,
        email: ecosystem.email,
        sms: ecosystem.sms
      }
    });

    let response = await service.provider().createEcosystem(request);

    dispatch({
      type: CREATE_ECOSYSTEM,
      ecosystem: response.ecosystem
    });
  }
}

export const GET_ECOSYSTEM_INFO = 'GET_ECOSYSTEM_INFO';

export function getEcosystemInfo() {
  return async (dispatch: Dispatch<EcosystemAction>, getState: () => State) => {
    let request = Ecosystem.fromPartial({});
    let response = await service.provider().ecosystemInfo(request);

    dispatch({
      type: GET_ECOSYSTEM_INFO,
      ecosystem: response.ecosystem
    });
  }
}
