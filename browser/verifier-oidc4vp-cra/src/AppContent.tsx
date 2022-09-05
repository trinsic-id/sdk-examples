import * as React from 'react';

import { AuthService } from './AuthService';


export default class AppContent extends React.Component<any, any> {
  public authService: AuthService;

  constructor(props: any) {
    super(props);

    this.authService = new AuthService();
    this.state = { user: {}, api: {} };
  }

  public componentDidMount() {
  }

  public login = () => {
    this.authService.login();
  };

  public callApi = () => {

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
      </>
    );
  }
}
