import React from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {login} from '../actions';
import Button from '../components/Button';
import {ActionState, OnChangeType, PreventDefaultType} from "../types";
import {ThunkDispatch} from "redux-thunk";

export type LoginStateType = {
    name: string,
    email: string,
    goToVerify: boolean
}
export type LoginPropType = {
    login(email: string, name: string): any
};

export class LoginPage extends React.Component<LoginPropType, LoginStateType> {
    constructor(props: LoginPropType | Readonly<LoginPropType>) {
        super(props);

        this.state = {
            name: "",
            email: "",
            goToVerify: false
        }
    }

    onChange(e: OnChangeType) {
        // @ts-ignore
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login(e: PreventDefaultType) {
        e.preventDefault();
        this.props.login(this.state.email, this.state.name)
        this.setState({
            goToVerify: true
        })
    }

    render() {
        if (this.state.goToVerify) {
            return <Navigate to="/security"/>
        }
        return (
            <div className='w-full flex items-center justify-center pt-32'>
                <div className='max-w-sm bg-white rounded shadow-md p-8 pt-12 mt-4'>
                    <h1 className='text-3xl font-bold mb-4'>Login</h1>
                    <hr/>

                    <form className='mt-4' onSubmit={this.login.bind(this)}>
                        <div className='mt-4'>
                            <label className='font-bold'>Email</label>
                            <input
                                name="email"
                                type="email"
                                className='block w-full border border-black  rounded mt-1 py-1 px-2'
                                placeholder='name@provider.com'
                                onChange={this.onChange.bind(this)}
                            />
                        </div>

                        <div className='mt-4'>
                            <label className='font-bold'>Full Name</label>
                            <input
                                name="name"
                                type="text"
                                className='block w-full border border-black  rounded mt-1 py-1 px-2'
                                placeholder='John Doe'
                                onChange={this.onChange.bind(this)}
                            />
                        </div>

                        <Button className="w-full mt-4" type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: { authentication: { loggedIn: any; }; }) {
    return {
        loggedIn: state.authentication.loggedIn
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<ActionState, undefined, any>) {
    return {
        login: (email: string, name: string) => dispatch(login(email, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);