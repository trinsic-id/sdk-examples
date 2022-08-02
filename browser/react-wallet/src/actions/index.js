const trinsic = require("@trinsic/trinsic/lib/browser");
export const ResponseStatus = trinsic.ResponseStatus;
const serverConfig = trinsic.ServiceOptions.fromPartial({ serverEndpoint: "dev-internal.trinsic.cloud", serverUseTls: true, serverPort: 443});
const trinsicService = new trinsic.TrinsicService(serverConfig);
export const ERROR = 'ERROR';

const setTrinsicTokenFromState = (getState) => {
  trinsicService.options.authToken = getState().authentication.profile;
}

export const LOGIN = 'LOGIN';
export const login = (email, name) => {
  return async (dispatch) => {
    let response = await trinsicService.account().login({email: email, ecosystemId: "", invitationCode: ""});

    dispatch({
      type: LOGIN,
      user: { name, email },
      loginResponse: response
    })
  }
}

export const VERIFY_EMAIL = 'VERIFY_EMAIL';
export const verifyEmail = (securityCode) => {
  return async (dispatch, getState) => {
    const auth = getState().authentication;
    let profileString = await trinsicService.account().loginConfirm(auth.loginResponse.challenge, securityCode);

    dispatch({
      type: VERIFY_EMAIL,
      user: auth.user,
      profile: profileString
    })
  }
}

export const LOGOUT = 'LOGOUT';
export const logout = () => {
  localStorage.clear();
  return {
    type: LOGOUT
  }
}


export const GET_CREDENTIAL_TEMPLATES = 'GET_CREDENTIAL_TEMPLATES';
export const getCredentialTemplates = () => {
  return async (dispatch, getState) => {
    setTrinsicTokenFromState(getState);

    let response = await trinsicService.template().searchCredentialTemplate({query: "SELECT * FROM c", continuationToken: ""});

    dispatch({
      type: GET_CREDENTIAL_TEMPLATES,
      items: JSON.parse(response.itemsJson).Documents
    });
  }
}

export const CREATE_CREDENTIAL_TEMPLATE = 'CREATE_CREDENTIAL_TEMPLATE';
export const createCredentialTemplate = (name, fields) => {
  return async (dispatch, getState) => {
    setTrinsicTokenFromState(getState);

    const request = trinsic.CreateCredentialTemplateRequest.fromPartial({name: name});
    fields.forEach(field => {
      let templateField = trinsic.TemplateField.fromPartial({description: field[1], optional: field[2]});
      switch (field[3]) {
        case "string":
          templateField.type = (trinsic.FieldType.STRING)
          break;
        case "number":
          templateField.type = (trinsic.FieldType.NUMBER)
          break;
        case "bool":
          templateField.type = (trinsic.FieldType.BOOL)
          break;
        case "datetime":
          templateField.type = (trinsic.FieldType.DATETIME)
          break;
        default:
          templateField.type = (trinsic.FieldType.STRING)
          break;
      }
      request.fields[field[0]] = templateField
    });

    let response = await trinsicService.template().createCredentialTemplate(request);

    dispatch({
      type: CREATE_CREDENTIAL_TEMPLATE,
      response
    })
  }
}

export const GET_WALLET_ITEMS = 'GET_WALLET_ITEMS';
export const getWalletItems = () => {
  return async (dispatch, getState) => {
    setTrinsicTokenFromState(getState);
    
    let response = await trinsicService.wallet().search();
    let items = response.items.map(item => JSON.parse(item))

    dispatch({
      type: GET_WALLET_ITEMS,
      items: items
    })
  }
}

export const INSERTING_WALLET_ITEM = 'INSERTING_WALLET_ITEM';
export const INSERTED_WALLET_ITEM = 'INSERTED_WALLET_ITEM';
export const insertWalletItem = (item) => {
  return async (dispatch, getState) => {
    setTrinsicTokenFromState(getState);
    
    dispatch({
      type: INSERTING_WALLET_ITEM
    })

    let response = await trinsicService.wallet().insertItem(item);

    dispatch({
      type: INSERTED_WALLET_ITEM,
      itemId: response
    })
  }
}

export const SEND_CREDENTIAL = 'SEND_CREDENTIAL';
export const sendCredential = (credential, email) => {
  return async (dispatch, getState) => {
    setTrinsicTokenFromState(getState);
    
    let sendResponse = await trinsicService.credential().send( trinsic.SendRequest.fromPartial({ email: email, documentJson: credential}));
    
    dispatch({
      type: SEND_CREDENTIAL,
      response: sendResponse
    })
  }
}

export const ISSUE_CREDENTIAL = 'ISSUE_CREDENTIAL';
export const issueCredential = (templateId, values) => {
  return async (dispatch, getState) => {
    setTrinsicTokenFromState(getState);

    let request = trinsic.IssueFromTemplateRequest.fromPartial({templateId: templateId, valuesJson: JSON.stringify(values)});
    let response = await trinsicService.credential().issueFromTemplate(request);

    dispatch({
      type: ISSUE_CREDENTIAL,
      credential: response.documentJson
    });
  }
}

export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const closeNotification = () => {
  return {
    type: CLOSE_NOTIFICATION
  }
}
