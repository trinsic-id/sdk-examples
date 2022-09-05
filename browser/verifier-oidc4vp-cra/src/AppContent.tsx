import * as React from 'react';

import { AuthService } from './AuthService';


export default class AppContent extends React.Component<any, any> {
  public authService: AuthService;

  constructor(props: any) {
    super(props);

    this.authService = new AuthService();
    this.state = { token: "" };
  }

  public componentDidMount() {
    this.authService.getUser().then((user: any) => {
      console.log(user);
      this.setState({token: JSON.stringify(user.profile._vp_token, null, 2)});
    });
  }

  public login = () => {
    this.authService.login();
  };

  public logout = () => {
    this.authService.logout();
  };

  public render() {
    return (
      <>
        <button onClick={this.login}>
          Share Credential
        </button>

        <pre>
          {this.state.token}
        </pre>
      </>
    );
  }
}
