const trinsic = require("@trinsic/trinsic-web");
const axios = require("axios").default;
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {"Content-Type": "application/json"}
});
export const ResponseStatus = trinsic.ResponseStatus;
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
    // const service = new trinsic.AccountService(new trinsic.ServiceOptions());
    // const details = new trinsic.AccountDetails();
    // details.setEmail(email);
    // details.setName(name);
    // // let response = await service.signIn((new trinsic.SignInRequest()).setDetails(details));
    // let response = await service.signIn(new trinsic.SignInRequest());
    // let profile = trinsic.AccountProfile.deserializeBinary(Buffer.from(response, "base64")).toObject();
    // service.options.setAuthToken(response);
    let token = (await api.post("/account/login")).data.token;
    let profile = trinsic.AccountProfile.deserializeBinary(Buffer.from(token, "base64")).toObject();

    dispatch({
      type: LOGIN,
      user: { name, email },
      profile: profile,
      token: profile.authToken
    })
  }
}

export const VERIFY_EMAIL = 'VERIFY_EMAIL';
export const verifyEmail = (securityCode) => {
  return async (dispatch, getState) => {
    // const service = new trinsic.AccountService(new trinsic.ServiceOptions());
    const auth = getState().authentication;
    // const profile = getProfileFromState(getState);
    // service.options.setAuthToken(auth.token)

    // let unprotectedProfile = await service.unprotect(profile, securityCode);
    let response = await api.post("/account/verify");
    console.log(response);

    dispatch({
      type: VERIFY_EMAIL,
      user: auth.user,
      // profile: unprotectedProfile.toObject(),
      // token: unprotectedProfile.toObject().authToken
      profile: auth.profile,
      token: auth.token
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
    // const options = new trinsic.ServiceOptions();
    // options.setAuthToken(getState().authentication.token);
    // const service = new trinsic.TemplateService(options);

    // let request = new trinsic.SearchCredentialTemplatesRequest();
    // request.setQuery("select * from c");
    // let response = await service.searchCredentialTemplate(request);
    let items = (await api.get("/templates")).data;
    console.log("templates", items)

    dispatch({
      type: GET_CREDENTIAL_TEMPLATES,
      // items: JSON.parse(response.getItemsJson()).Documents
      items: JSON.parse(items)
    });
  }
}

export const CREATE_CREDENTIAL_TEMPLATE = 'CREATE_CREDENTIAL_TEMPLATE';
export const createCredentialTemplate = (name, fields) => {
  return async (dispatch, getState) => {
    // const options = new trinsic.ServiceOptions();
    // options.setAuthToken(getState().authentication.token);
    // const service = new trinsic.TemplateService(options);

    // var request = new trinsic.CreateCredentialTemplateRequest();
    // request.setName(name); 
    // fields.forEach(field => {
    //   let templateField = new trinsic.TemplateField();
    //   templateField.setDescription(field[1]);
    //   templateField.setOptional(field[2]);
    //   switch (field[3]) {
    //     case "string":
    //       templateField.setType(trinsic.FieldType.STRING)
    //       break;
    //     case "number":
    //       templateField.setType(trinsic.FieldType.NUMBER)
    //       break;
    //     case "bool":
    //       templateField.setType(trinsic.FieldType.BOOL)
    //       break;
    //     case "datetime":
    //       templateField.setType(trinsic.FieldType.DATETIME)
    //       break;
    //     default:
    //       templateField.setType(trinsic.FieldType.STRING)
    //       break;
    //   }
    //   request.getFieldsMap().set(field[0], templateField)
    // });

    // let response = await service.createCredentialTemplate(request);
    let response = (await api.post("/templates", {name, fields})).data

    dispatch({
      type: CREATE_CREDENTIAL_TEMPLATE,
      response
    })
  }
}

export const GET_WALLET_ITEMS = 'GET_WALLET_ITEMS';
export const getWalletItems = () => {
  return async (dispatch, getState) => {
    // const options = new trinsic.ServiceOptions();
    // options.setAuthToken(getState().authentication.token);
    // console.log(options.toObject())
    // const service = new trinsic.WalletService(options);
    
    // let response = await service.search();
    // let items = response.getItemsList().map(item => item.getJsonStruct().toJavaScript());
    // items = items.map(item => JSON.parse(Object.values(item.data).join('')))
    let response = (await api.get("/wallet/items")).data;
    let items = response.map(item => {
      let i = JSON.parse(item);
      if (typeof(i.data) === "string") {
        i.data = JSON.parse(i.data);
      }
      return i;
    })
    console.log(response, items);
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
    // const options = new trinsic.ServiceOptions();
    // options.setAuthToken(getState().authentication.token);
    // const service = new trinsic.WalletService(options);
    
    dispatch({
      type: INSERTING_WALLET_ITEM
    })

    // let response = await service.insertItem(item);
    if (typeof(item) === "string") item = JSON.parse(item);
    let response = (await api.post("/wallet/insert", {item})).data

    dispatch({
      type: INSERTED_WALLET_ITEM,
      itemId: response
    })
  }
}

export const SEND_CREDENTIAL = 'SEND_CREDENTIAL';
export const sendCredential = (credential, email) => {
  return async (dispatch, getState) => {
    const options = new trinsic.ServiceOptions();
    options.setAuthToken(getState().authentication.token);
    const service = new trinsic.CredentialService(options);
    
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
    // const options = new trinsic.ServiceOptions();
    // options.setAuthToken(getState().authentication.token);
    // const service = new trinsic.CredentialService(options);

    // let request = new trinsic.IssueFromTemplateRequest();
    // request.setTemplateId(templateId);
    // request.setValuesJson(JSON.stringify(values));

    // let response = await service.issueFromTemplate(request);
    let credential = (await api.post("/credential/issueFromTemplate", { templateId, values })).data

    dispatch({
      type: ISSUE_CREDENTIAL,
      // credential: response.getDocumentJson()
      credential
    });
  }
}

export const CREATE_PROOF = 'CREATE_PROOF';
export const createProof = (itemId) => {
  return async (dispatch, getState) => {
    let proof = (await api.post("/credential/proof", { itemId })).data;

    dispatch({
      type: CREATE_PROOF,
      document: proof
    })
  }
}

export const IS_VERIFYING = 'IS_VERIFYING';
export const VERIFY_PROOF = 'VERIFY_PROOF';
export const verifyProof = (document) => {
  return async (dispatch, getState) => {
    dispatch({ type: IS_VERIFYING});
    
    console.log("document", document)
    let response = (await api.post("/credential/verify", { document })).data

    dispatch({
      type: VERIFY_PROOF,
      isValid: response.isValid
    })
  }
}

export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const closeNotification = () => {
  return {
    type: CLOSE_NOTIFICATION
  }
}
