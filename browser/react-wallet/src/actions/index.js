const trinsic = require("@trinsic/trinsic-web");
export const ResponseStatus = trinsic.ResponseStatus;
const serverConfig = new trinsic.ServerConfig();
serverConfig.setEndpoint("dev-internal.trinsic.cloud");
serverConfig.setPort(443);
serverConfig.setUseTls(true);
const options = { server: serverConfig };

export const ERROR = 'ERROR';

const getProfileFromState = (getState) => {
  const profileObject = getState().authentication.profile;
  
  let profile = new trinsic.AccountProfile();
  profile.setAuthData(profileObject.authData);
  profile.setAuthToken(profileObject.authToken);
  profile.setProfileType(profileObject.profileType);

  let protection = new trinsic.TokenProtection();
  protection.setEnabled(profileObject.protection.enabled);
  protection.setMethod(profileObject.protection.method);
  profile.setProtection(protection);

  return profile;
}

export const LOGIN = 'LOGIN';
export const login = (email, name) => {
  return async (dispatch) => {
    const service = new trinsic.AccountService(options);
    const details = new trinsic.AccountDetails();
    details.setEmail(email);
    details.setName(name);
    let response = await service.signIn(details);

    if (response.getStatus() !== ResponseStatus.SUCCESS) {
      console.error("Invalid sign in");
      dispatch({
        type: ERROR,
        status: response.getStatus()
      });
    }

    else dispatch({
      type: LOGIN,
      user: { name, email },
      profile: response.getProfile().toObject()
    })
  }
}

export const VERIFY_EMAIL = 'VERIFY_EMAIL';
export const verifyEmail = (securityCode) => {
  return async (dispatch, getState) => {
    const service = new trinsic.AccountService(options);
    const auth = getState().authentication;
    const profile = getProfileFromState(getState);
    service.updateActiveProfile(profile);

    let unprotectedProfile = await service.unprotect(profile, securityCode);

    dispatch({
      type: VERIFY_EMAIL,
      user: auth.user,
      profile: unprotectedProfile.toObject()
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
    const profile = getProfileFromState(getState);
    options.profile = profile
    const service = new trinsic.TemplateService(options);
    service.updateActiveProfile(profile);

    let request = new trinsic.SearchCredentialTemplatesRequest();
    request.setQuery("select * from c");
    let response = await service.searchCredentialTemplate(request);

    dispatch({
      type: GET_CREDENTIAL_TEMPLATES,
      items: JSON.parse(response.getItemsJson()).Documents
    });
  }
}

export const CREATE_CREDENTIAL_TEMPLATE = 'CREATE_CREDENTIAL_TEMPLATE';
export const createCredentialTemplate = (name, fields) => {
  return async (dispatch, getState) => {
    const profile = getProfileFromState(getState);
    options.profile = profile;
    const service = new trinsic.TemplateService(options);
    service.updateActiveProfile(profile);

    var request = new trinsic.CreateCredentialTemplateRequest();
    request.setName(name); 
    fields.forEach(field => {
      let templateField = new trinsic.TemplateField();
      templateField.setDescription(field[1]);
      templateField.setOptional(field[2]);
      switch (field[3]) {
        case "string":
          templateField.setType(trinsic.FieldType.STRING)
          break;
        case "number":
          templateField.setType(trinsic.FieldType.NUMBER)
          break;
        case "bool":
          templateField.setType(trinsic.FieldType.BOOL)
          break;
        case "datetime":
          templateField.setType(trinsic.FieldType.DATETIME)
          break;
        default:
          templateField.setType(trinsic.FieldType.STRING)
          break;
      }
      request.getFieldsMap().set(field[0], templateField)
    });

    let response = await service.createCredentialTemplate(request);

    dispatch({
      type: CREATE_CREDENTIAL_TEMPLATE,
      response
    })
  }
}

export const GET_WALLET_ITEMS = 'GET_WALLET_ITEMS';
export const getWalletItems = () => {
  return async (dispatch, getState) => {
    const profile = getProfileFromState(getState);
    const service = new trinsic.WalletService(options);
    service.updateActiveProfile(profile);
    
    let response = await service.search();
    let items = response.getItemsList().map(item => item.getJsonStruct().toJavaScript());
    items = items.map(item => JSON.parse(Object.values(item.data).join('')))

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
    const service = new trinsic.WalletService(options);
    const profile = getProfileFromState(getState);
    service.updateActiveProfile(profile);
    
    dispatch({
      type: INSERTING_WALLET_ITEM
    })

    let response = await service.insertItem(item);

    dispatch({
      type: INSERTED_WALLET_ITEM,
      itemId: response
    })
  }
}

export const SEND_CREDENTIAL = 'SEND_CREDENTIAL';
export const sendCredential = (credential, email) => {
  return async (dispatch, getState) => {
    const service = new trinsic.CredentialService(options);
    const profile = getProfileFromState(getState);
    service.updateActiveProfile(profile);
    
    let sendResponse = await service.send({document: credential}, email);
    
    dispatch({
      type: SEND_CREDENTIAL,
      response: sendResponse
    })
  }
}

export const ISSUE_CREDENTIAL = 'ISSUE_CREDENTIAL';
export const issueCredential = (templateId, values) => {
  return async (dispatch, getState) => {
    const service = new trinsic.CredentialService(options);
    const profile = getProfileFromState(getState);
    service.updateActiveProfile(profile);

    let request = new trinsic.IssueFromTemplateRequest();
    request.setTemplateId(templateId);
    request.setValuesJson(JSON.stringify(values));

    let response = await service.issueFromTemplate(request);

    dispatch({
      type: ISSUE_CREDENTIAL,
      credential: response.getDocumentJson()
    });
  }
}

export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const closeNotification = () => {
  return {
    type: CLOSE_NOTIFICATION
  }
}
