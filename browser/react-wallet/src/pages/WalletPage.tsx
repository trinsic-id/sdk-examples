import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import IssueCredentialPage from './IssueCredentialPage';
import StoreItemPage from './StoreItemPage';
import VerifyCredentialPage from './VerifyCredentialPage';
import ItemsListPage from './ItemsListPage';
import PrivateRoute from '../components/PrivateRoute';
import { getEcosystemInfo, getWalletItems } from '../actions';
import WalletNavbar from '../components/WalletNavbar';
import CredentialTemplatesPage from './CredentialTemplatesPage';
import CreateCredentialTemplatePage from './CreateCredentialTemplatePage';
import EcosystemsPage from './EcosystemsPage';

export class WalletPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldNavigate: false,
      navigateTo: ""
    }
  }

  componentDidMount() {
    this.props.getItems();
    this.props.getEcosystemInfo();
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
      <div className="flex pt-24">
        <WalletNavbar walletName={this.props.user.name}/>
        <div id="content" className="w-full mt-8 ml-16 mr-8">
          <Routes>
            <Route path="/issue" element={<PrivateRoute><IssueCredentialPage /></PrivateRoute>} />
            <Route path="/verify" element={<PrivateRoute><VerifyCredentialPage /></PrivateRoute>} />
            <Route path="/store" element={<PrivateRoute><StoreItemPage /></PrivateRoute>} />
            <Route path="/" element={<PrivateRoute><ItemsListPage /></PrivateRoute>} />
            <Route path="/templates" element={<PrivateRoute><CredentialTemplatesPage /></PrivateRoute>} />
            <Route path="/templates/generator" element={<PrivateRoute><CreateCredentialTemplatePage /></PrivateRoute>} />
            <Route path="/ecosystems" element={<PrivateRoute><EcosystemsPage /></PrivateRoute>} />
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
    getItems: () => dispatch(getWalletItems()),
    getEcosystemInfo: () => dispatch(getEcosystemInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);