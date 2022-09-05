import { Log, User, UserManager } from 'oidc-client';

const clientRoot: string = "http://localhost:3000/";

export class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: "https://connect-dev.trinsic.cloud",
      client_id: "verifier-oidc4vp-client",
      redirect_uri: `${clientRoot}signin-callback.html`,
      silent_redirect_uri: `${clientRoot}silent-renew.html`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${clientRoot}`,
      response_type: 'code',
      scope: 'openid',
      extraQueryParams: {
        "trinsic:ecosystem": "default",
        "trinsic:schema": "https://dev-schema.trinsic.cloud/default/attendance-badge"
      }
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
