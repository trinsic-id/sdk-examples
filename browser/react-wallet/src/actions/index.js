const trinsic = require("@trinsic/trinsic/browser");
export const ResponseStatus = trinsic.ResponseStatus;

const serviceOptions = trinsic.ServiceOptions.fromPartial({});

export const ERROR = 'ERROR';

const getProfileFromState = (getState) => {
  const profileObject = getState().authentication.profile;
  let profile = trinsic.AccountProfile.fromPartial(profileObject);

  return profile;
}

export const LOGIN = 'LOGIN';
export const login = (email, name) => {
  return async (dispatch) => {
    const service = new trinsic.AccountService(serviceOptions);

    const loginResponse = await service.login(
      trinsic.LoginRequest.fromPartial({
        email,
      })
    );
    
    dispatch({
      type: LOGIN,
      user: { name, email },
      profile: loginResponse,
      challenge: loginResponse.challenge
    })
  }
}

export const VERIFY_EMAIL = 'VERIFY_EMAIL';
export const verifyEmail = (securityCode) => {
  return async (dispatch, getState) => {
    const service = new trinsic.AccountService(serviceOptions);
    const auth = getState().authentication;
    const profile = getProfileFromState(getState);

    const authToken = await service.loginConfirm(auth.challenge, securityCode);

    dispatch({
      type: VERIFY_EMAIL,
      user: auth.user,
      profile: Object.assign({}, profile, { authToken: authToken }),
      authToken: authToken
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
    serviceOptions.authToken = profile.authToken;
    const service = new trinsic.TemplateService(serviceOptions);

    let request = trinsic.SearchCredentialTemplatesRequest.fromPartial({
      query: "select * from c order by c.name"
    });
    let response = await service.searchCredentialTemplate(request);
    let items = JSON.parse(response.itemsJson);

    dispatch({
      type: GET_CREDENTIAL_TEMPLATES,
      items: items
    });
  }
}

export const CREATE_CREDENTIAL_TEMPLATE = 'CREATE_CREDENTIAL_TEMPLATE';
export const createCredentialTemplate = (name, fields) => {
  return async (dispatch, getState) => {
    const profile = getProfileFromState(getState);
    serviceOptions.authToken = profile.authToken;
    const service = new trinsic.TemplateService(serviceOptions);

    var request = trinsic.CreateCredentialTemplateRequest.fromPartial({
      name: name,
      fields: fields
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
    serviceOptions.authToken = profile.authToken;
    const service = new trinsic.WalletService(serviceOptions);
    
    let response = await service.search();
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
export const insertWalletItem = (item) => {
  return async (dispatch, getState) => {
    const profile = getProfileFromState(getState);
    serviceOptions.authToken = profile.authToken;
    const service = new trinsic.WalletService(serviceOptions);
    
    dispatch({
      type: INSERTING_WALLET_ITEM
    })

    let request = trinsic.InsertItemRequest.fromPartial({
      itemJson: JSON.stringify(item)
    });

    let response = await service.insertItem(request);

    dispatch({
      type: INSERTED_WALLET_ITEM,
      itemId: response
    })
  }
}

export const SEND_CREDENTIAL = 'SEND_CREDENTIAL';
export const sendCredential = (credential, email) => {
  return async (dispatch, getState) => {
    const profile = getProfileFromState(getState);
    serviceOptions.authToken = profile.authToken;
    const service = new trinsic.CredentialService(serviceOptions);
    
    let request = trinsic.SendRequest.fromPartial({
      documentJson: JSON.stringify(credential),
      email: email
    })
    let response = await service.send(request);
    
    dispatch({
      type: SEND_CREDENTIAL,
      response: response
    })
  }
}

export const ISSUE_CREDENTIAL = 'ISSUE_CREDENTIAL';
export const issueCredential = (templateId, values) => {
  return async (dispatch, getState) => {
    const profile = getProfileFromState(getState);
    serviceOptions.authToken = profile.authToken;
    const service = new trinsic.CredentialService(serviceOptions);

    let request = trinsic.IssueFromTemplateRequest.fromPartial({
      templateId: templateId,
      valuesJson: JSON.stringify(values)
    });
    
    let response = await service.issueFromTemplate(request);

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

export const CREATE_ECOSYSTEM = 'CREATE_ECOSYSTEM';
export const createEcosystem = (ecosystem) => {
  return async (dispatch, getState) => {
    const profile = getProfileFromState(getState);
    serviceOptions.authToken = profile.authToken;
    const service = new trinsic.ProviderService(serviceOptions);

    let request = trinsic.CreateEcosystemRequest.fromPartial({
      name: ecosystem.ecosystemName,
      description: ecosystem.description,
      uri: ecosystem.uri,
      details: {
        name: ecosystem.name,
        email: ecosystem.email,
        sms: ecosystem.sms
      }
    });

    let response = await service.createEcosystem(request);

    dispatch({
      type: CREATE_ECOSYSTEM,
      ecosystem: response.ecosystem
    });
  }
}

export const GET_ECOSYSTEM_INFO = 'GET_ECOSYSTEM_INFO';
export const getEcosystemInfo = () => {
  return async (dispatch, getState) => {
    const profile = getProfileFromState(getState);
    serviceOptions.authToken = profile.authToken;
    const service = new trinsic.ProviderService(serviceOptions);

    let request = trinsic.Ecosystem.fromPartial({});
    let response = await service.ecosystemInfo(request);

    dispatch({
      type: GET_ECOSYSTEM_INFO,
      ecosystem: response.ecosystem
    });
  }
}
