import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { logout } from './actions';
import TrinsicLogo from './components/Icons/TrinsicLogo';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App(props) {
  return (
    <>
      <Navbar className="bg-white shadow-md fixed w-full">
        <Navbar.Logo href="/#">
          <TrinsicLogo className="h-12" />
        </Navbar.Logo>
        <Navbar.List>
            {props.loggedIn && <Navbar.Item onClick={props.logout}>Sign Out</Navbar.Item> }
        </Navbar.List>
      </Navbar>
      <div className="bg-gray-100">
        <BrowserRouter> 
          <>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/" component={HomePage} />
          </>
        </BrowserRouter>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authentication.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
