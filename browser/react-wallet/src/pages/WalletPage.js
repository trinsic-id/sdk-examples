import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import IssueCredentialPage from './IssueCredentialPage';
import StoreItemPage from './StoreItemPage';
import VerifyCredentialPage from './VerifyCredentialPage';
import ItemsListPage from './ItemsListPage';
import PrivateRoute from '../components/PrivateRoute';
import { getWalletItems } from '../actions';
import WalletNavbar from '../components/WalletNavbar';

export class WalletPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldNavigate: false,
      navigateTo: ""
    }
  }

  async componentDidMount() {
    await this.props.getItems();
  }

  navigateTo = (location) => {
    this.setState({
      shouldNavigate: true,
      navigateTo: location
    });
  }

  renderItems = () => {
    return (
      <>
        {this.props.wallet.items.map((item) => <div>{item}</div>)}
      </>
    );
  }

  render() {
    if (this.state.shouldNavigate) {
      return <Navigate to={this.state.navigateTo} />
    }
    
    return (
      <div className="flex">
        <WalletNavbar walletName={this.props.user.name}/>
        <div id="content" className="ml-16 mr-8 mt-8 w-full">
          <Routes>
            <Route path="/issue" element={<PrivateRoute><IssueCredentialPage /></PrivateRoute>} />
            <Route path="/verify" element={<PrivateRoute><VerifyCredentialPage /></PrivateRoute>} />
            <Route path="/store" element={<PrivateRoute><StoreItemPage /></PrivateRoute>} />
            <Route path="/items" element={<PrivateRoute><ItemsListPage /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authentication.user,
    wallet: state.wallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: () => dispatch(getWalletItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);