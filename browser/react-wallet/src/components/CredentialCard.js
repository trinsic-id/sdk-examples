import React from 'react'
import ChevronDownIcon from './Icons/ChevronDownIcon';
import ChevronUpIcon from './Icons/ChevronUpIcon';
import { CloudIcon, LockClosedIcon } from './Icons';

class CredentialCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    toggleDropdown = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    renderOfferedCredential() {
        const { color, credential, text, className, ...otherProps } = this.props;
        const { open } = this.state;
        const colorClass = `bg-gradient-to-br from-${color}-700 to-${color}-400 text-${text}`;
        const animationClass = `transform transition-all duration-1000 ease-in-out`
        const mt = open ? "0" : "-150%";

        return (
            <div className={`flex flex-col rounded p-4 w-96 ${colorClass} ${className}`} {...otherProps}>
                <div className="flex flex-col pb-8 pt-4 text-xl">
                    <span>{credential.name}</span>
                </div>
                <div className="flex flex-col my-4">
                    <div className="overflow-hidden">
                        <div className={`${animationClass}`} style={{ marginTop: mt }}>
                            <div className="text-center">
                                Present QR Code when prompted by verifier
                            </div>
                            <div className="flex flex-row w-full justify-between bg-gray-50 text-gray-500 text-sm rounded p-4">
                                <div className="flex flex-col col-1/2 items-start text-left">
                                    {Object.keys(credential.credentialSubject).map((key) => {
                                        return <div key={key}>{key}</div>
                                    })}
                                </div>
                                <div className="flex flex-col col-1/2 items-end text-right">
                                    {Object.values(credential.credentialSubject).map((value) => {
                                        return <div key={value}>{value}</div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-full text-sm items-center pt-8">
                        {this.state.open &&
                            <ChevronUpIcon className="h-8 w-8 cursor-pointer" onClick={this.toggleDropdown} />
                        }
                        {!this.state.open &&
                            <ChevronDownIcon className="h-8 w-8 cursor-pointer" onClick={this.toggleDropdown} />
                        }
                        <span className="ml-auto mr-0">Issued {new Date(credential.issuanceDate).toDateString()}</span>
                    </div>
                </div>
            </div>
        );
    }

    renderDetailedCredential() {
        const { color, credential, text, className, ...otherProps } = this.props;
        const colorClass = `bg-gradient-to-br from-${color}-700 to-${color}-400 text-${text}`;

        return (
            <div className={`flex flex-col rounded  p-4 w-96 ${colorClass} ${className}`} {...otherProps}>
                <div className="flex flex-col pb-8 pt-4 text-xl">
                    <span>{credential.name}</span>
                </div>
                <div className="text-center">
                    Present QR Code when prompted by verifier
                </div>
                <div className="flex flex-col my-4">
                    <div>
                        <div className="flex flex-row w-full justify-between bg-gray-50 text-gray-500 text-sm rounded p-4">
                            <div className="flex flex-col col-1/2 items-start text-left">
                                {Object.keys(credential.credentialSubject).map((key) => {
                                    return <div key={key}>{key}</div>
                                })}
                            </div>
                            <div className="flex flex-col col-1/2 items-end text-right">
                                {Object.values(credential.credentialSubject).map((value) => {
                                    return <div key={value}>{value}</div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-full text-sm items-center pt-8">
                        <CloudIcon className="h-6 w-6" />
                        <span className="ml-auto mr-0">Issued {new Date(credential.issuanceDate).toDateString()}</span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { color, credential, text, offerview, detailedview, className, ...otherProps } = this.props;
        const colorClass = `bg-gradient-to-br from-${color}-700 to-${color}-400 text-${text}`;

        if (offerview) 
            return this.renderOfferedCredential();

        if (detailedview) {
            return this.renderDetailedCredential();
        }
        return (
            <div className={`flex flex-col rounded min-w-2xs w-72 h-40 ${colorClass} ${className}`} {...otherProps}>
                <div className={`flex flex-row w-full text-xs items-center p-2 mt-5 bg-${color}-400`}>
                    <LockClosedIcon className="w-4 h-4" />
                    <span className="ml-auto mr-0">Issued {new Date(credential.issuanceDate).toDateString()}</span>
                </div>
                <div className="p-4 mb-0 mt-auto">{credential.name}</div>
            </div>
        );
    }
}

CredentialCard.defaultProps = {
    offerview: "false",
    detailedview: "false", // only for the accepted state
    color: "red",
    text: "white",
    credential: {
        name: "",
        credentialSubject: {}
    }
}

export default CredentialCard