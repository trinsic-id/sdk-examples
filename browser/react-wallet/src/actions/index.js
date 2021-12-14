const trinsic = require("@trinsic/trinsic-web")

export const ERROR = 'ERROR';

export const LOGIN = 'LOGIN';
export const login = (email, name) => {
  // const service = new trinsic.AccountClient();
  // const request = new trinsic.AccountDetails();
  // request.setEmail(email);
  // request.setName(name);

  // try {
  //   let response = await service.signIn(request);

  //   if (response.getStatus().valueOf() !== 200) {
  //     console.error("Invalid sign in");
  //     return;
  //   }

  //   return {
  //     type: LOGIN,
  //     profile: response.getProfile()
  //   }
  // }
  // catch (e) {
  //   console.error(e);
  // }

  
  if (email && name) {
    return {
      type: LOGIN,
      profile: {
        email,
        name
      }
    }
  }
}

export const LOGOUT = 'LOGOUT';
export const logout = () => {
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


