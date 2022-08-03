import React from 'react';
import {connect} from 'react-redux';
import {Navigate, Route, Routes} from 'react-router-dom';
import IssueCredentialPage from './IssueCredentialPage';
import StoreItemPage from './StoreItemPage';
import VerifyCredentialPage from './VerifyCredentialPage';
import ItemsListPage from './ItemsListPage';
import PrivateRoute from '../components/PrivateRoute';
import {getEcosystemInfo, getWalletItems} from '../actions';
import WalletNavbar from '../components/WalletNavbar';
import CredentialTemplatesPage from './CredentialTemplatesPage';
import CreateCredentialTemplatePage from './CreateCredentialTemplatePage';
import EcosystemsPage from './EcosystemsPage';
import {ActionState} from "../types";
import {ThunkDispatch} from "redux-thunk";

interface WalletProps {
    wallet?: {
        items: any
    }
    user?: {
        name: string
    }

    getItems(): any

    getEcosystemInformation(): any
}

interface WalletState {
    shouldNavigate: boolean,
    navigateTo: string
}

export class WalletPage extends React.Component<WalletProps, WalletState> {
    constructor(props: WalletProps | Readonly<WalletProps>) {
        super(props);

        this.state = {
            shouldNavigate: false,
            navigateTo: ""
        }
    }

    componentDidMount() {
        console.warn("Disabled getItems() and getEcosystemInfo()")
        this.props.getItems();
        this.props.getEcosystemInformation();
    }

    navigateTo(location: string) {
        this.setState({
            shouldNavigate: true,
            navigateTo: location
        });
    }

    renderItems() {
        return (
            <>
                {this.props.wallet?.items.map((item: any) => <div>{item}</div>)}
            </>
        );
    }

    render() {
        if (this.state.shouldNavigate) {
            return <Navigate to={this.state.navigateTo}/>
        }

        return (
            <div className="flex pt-24">
                <WalletNavbar walletName={this.props.user?.name}/>
                <div id="content" className="w-full mt-8 ml-16 mr-8">
                    <Routes>
                        <Route path="/issue" element={<PrivateRoute><IssueCredentialPage/></PrivateRoute>}/>
                        <Route path="/verify" element={<PrivateRoute><VerifyCredentialPage/></PrivateRoute>}/>
                        <Route path="/store" element={<PrivateRoute><StoreItemPage/></PrivateRoute>}/>
                        <Route path="/" element={<PrivateRoute><ItemsListPage/></PrivateRoute>}/>
                        <Route path="/templates" element={<PrivateRoute><CredentialTemplatesPage/></PrivateRoute>}/>
                        <Route path="/templates/generator"
                               element={<PrivateRoute><CreateCredentialTemplatePage/></PrivateRoute>}/>
                        <Route path="/ecosystems" element={<PrivateRoute><EcosystemsPage/></PrivateRoute>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: ActionState) {
    return {
        user: state.authentication.user,
        wallet: state.wallet
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<ActionState, undefined, any>) {
    return {
        getItems: () => dispatch(getWalletItems()),
        getEcosystemInformation: () => dispatch(getEcosystemInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);