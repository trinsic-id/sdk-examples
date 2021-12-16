const trinsic = require("@trinsic/trinsic-web")

export const ERROR = 'ERROR';
export const ResponseStatus = { 
  "SUCCESS": 0,
  "WALLET_ACCESS_DENIED": 10,
  "WALLET_EXISTS": 11,
  "ITEM_NOT_FOUND": 20,
  "SERIALIZATION_ERROR": 200,
  "UNKNOWN_ERROR": 100
}

export const LOGIN = 'LOGIN';
export const login = (email, name) => {
  return async (dispatch) => {
    const service = new trinsic.AccountService();
    const request = new trinsic.AccountDetails();
    request.setEmail(email);
    request.setName(name);
    let response = await service.signIn(request);

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
    const service = new trinsic.AccountService();
    const request = new trinsic.AccountDetails();
    const auth = getState().authentication;
    request.setSms(securityCode);
    // request.setEmail(auth.user.email);
    // request.setName(auth.user.name);
    let response = await service.signIn(request);
    console.log(response.getStatus())
    if (response.getStatus() !== ResponseStatus.SUCCESS) {
      console.error("Invalid sign in");
      dispatch({
        type: ERROR,
        status: response.getStatus()
      });
    }

    else dispatch({
      type: VERIFY_EMAIL,
      user: auth.user,
      profile: response.getProfile().toObject()
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
  return {
    type: GET_CREDENTIAL_TEMPLATES,
    templates: []
  }
}

export const CREATE_CREDENTIAL_TEMPLATE = 'CREATE_CREDENTIAL_TEMPLATE';


