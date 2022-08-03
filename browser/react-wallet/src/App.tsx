import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { logout } from './actions';
import TrinsicLogo from './components/Icons/TrinsicLogo';
import Navbar from './components/Navbar';
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
        <Navbar.Logo href="/#" className={""}>
          <TrinsicLogo className="h-12" />
        </Navbar.Logo>
        <Navbar.List className="justify-between">
            {props.loggedIn && <Navbar.Item className={""} onClick={props.logout}>Sign Out</Navbar.Item> }
            {props.loggedIn && <Navbar.Item className={""}>Ecosystem: {props.ecosystem?.name}</Navbar.Item> }
        </Navbar.List>
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
