import { Log, User, UserManager } from "oidc-client-ts";

const clientRoot: string = "http://localhost:3000/";

export const defaultEcosystem = "hersh-test";
export const defaultSchema =
  "https://dev-schema.trinsic.cloud/hersh-test/zbettertemplate";

export const defaultAuthSettings = {
  authority: "https://dev-connect.trinsic.cloud",
  client_id: "okie-dokie",
  redirect_uri: `${clientRoot}redirect`,
  silent_redirect_uri: `${clientRoot}silent-renew`,
  post_logout_redirect_uri: `${clientRoot}`,
  response_type: "code",
  scope: "openid",
  extraQueryParams: {
    "trinsic:ecosystem": defaultEcosystem,
    "trinsic:schema": defaultSchema,
  },
};

export class AuthService {
  public userManager: UserManager;
  public settings: typeof defaultAuthSettings | undefined;
  constructor(settings: typeof defaultAuthSettings) {
    this.settings = settings;
    this.userManager = new UserManager(this.settings);
    Log.setLogger(console);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public async signinRedirect() {
    const user = await this.userManager.signinRedirectCallback();
    console.log("Logged in user", user);
  }
}
