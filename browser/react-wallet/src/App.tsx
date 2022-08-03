import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { logout } from './actions';
import TrinsicLogo from './components/Icons/TrinsicLogo';
import {Navbar, NavbarLogo, NavbarList, NavbarItem} from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import WalletPage from './pages/WalletPage';
import {AppProps, AppState} from "./types";
import {Dispatch} from "redux";

function App(props: AppProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar className="fixed w-full bg-white shadow-md">
        <NavbarLogo href="/#">
          <TrinsicLogo className="h-12" />
        </NavbarLogo>
        <NavbarList className="justify-between">
            {props.loggedIn && <NavbarItem onClick={() => props.logout()}>Sign Out</NavbarItem> }
            {props.loggedIn && <NavbarItem>Ecosystem: {props.ecosystem?.name}</NavbarItem> }
        </NavbarList>
      </Navbar>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/security" element={<VerifyEmailPage />} />
        <Route path="/*" element={<PrivateRoute loggedIn={props.loggedIn}><WalletPage /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

function mapStateToProps(state: AppState): { ecosystem: any; loggedIn: boolean } {
  return {
    loggedIn: state.authentication.loggedIn,
    ecosystem: state.ecosystems.currentEcosystem
  }
}
function mapDispatchToProps(dispatch: Dispatch): { logout: () => any } {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
