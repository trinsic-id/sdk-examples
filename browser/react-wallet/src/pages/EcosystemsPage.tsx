import React from 'react';
import {connect} from 'react-redux';
import {createEcosystem} from '../actions';
import Button from '../components/Button';
import {Input} from '../components/Inputs';
import {ActionState, EcosystemType, OnChangeType, PreventDefaultType} from '../types';
import {ThunkDispatch} from "redux-thunk";

export type EcosystemsStateType = {
    ecosystemName: string,
    description: string,
    uri: string,
    name: string,
    email: string,
    sms: string
}
export type EcosystemsPropsType = {
    user: { name: string, email: string }

    createEcosystem(state: EcosystemsStateType): any
};

export class EcosystemsPage extends React.Component<EcosystemsPropsType, EcosystemsStateType> {
    constructor(props: EcosystemsPropsType | Readonly<EcosystemsPropsType>) {
        super(props);

        this.state = {
            ecosystemName: "",
            description: "",
            uri: "",
            name: props.user.name ?? "",
            email: props.user.email ?? "",
            sms: ""
        }
    }

    onChange(e: OnChangeType) {
        // @ts-ignore
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e: PreventDefaultType) {
        e.preventDefault()
        this.props.createEcosystem(this.state)
    }

    render() {
        return (
            <div className="flex flex-col w-full px-4">
                <div className="box-border w-full border-2 shadow-lg">
                    <div className="p-2 text-lg font-semibold">Create An Ecosystem</div>
                    <form onSubmit={this.submit.bind(this)}>
                        <div className="px-2">
                            <label>Ecosystem Name</label>
                            <Input className="w-5/6" name="ecosystemName" value={this.state.ecosystemName}
                                   onChange={this.onChange.bind(this)} required/>
                            <label>Description</label>
                            <Input className="w-5/6" name="description" value={this.state.description}
                                   onChange={this.onChange.bind(this)}/>
                            <label>uri</label>
                            <Input className="w-5/6" name="uri" value={this.state.uri}
                                   onChange={this.onChange.bind(this)}/>
                            <label>Owner Name</label>
                            <Input className="w-5/6" name="name" value={this.state.name}
                                   onChange={this.onChange.bind(this)}/>
                            <label>Email</label>
                            <Input className="w-5/6" name="email" value={this.state.email}
                                   onChange={this.onChange.bind(this)}/>
                            <label>Sms</label>
                            <Input className="w-5/6" name="sms" value={this.state.sms}
                                   onChange={this.onChange.bind(this)}/>
                        </div>
                        <div className="flex justify-center p-4 space-x-4">
                            <Button className="w-1/2" type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: { authentication: { user: any; }; }) {
    return {
        user: state.authentication.user,
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<ActionState, undefined, any>) {
    return {
        createEcosystem: (ecosystem: EcosystemType) => dispatch(createEcosystem(ecosystem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EcosystemsPage);