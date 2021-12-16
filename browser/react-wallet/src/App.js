import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { logout } from './actions';
import TrinsicLogo from './components/Icons/TrinsicLogo';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App(props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar className="bg-white shadow-md w-full">
        <Navbar.Logo href="/#">
          <TrinsicLogo className="h-12" />
        </Navbar.Logo>
        <Navbar.List>
            {props.loggedIn && <Navbar.Item onClick={props.logout}>Sign Out</Navbar.Item> }
        </Navbar.List>
      </Navbar>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      </Routes>
    </div>
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
