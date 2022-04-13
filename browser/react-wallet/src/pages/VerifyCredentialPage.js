import React from 'react';
import { connect } from 'react-redux';
import { verifyProof, IS_VERIFYING } from '../actions';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '../components/Button';
import { BadgeCheck, XIcon } from '../components/Icons';

export class VerifyCredentialPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      proofDocument: ""
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    this.props.resetVerifying();
  }

  verifyProof = (e) => {
    this.props.verifyProof(this.state.proofDocument);

  }

  renderIsValid = () => {
    if (this.props.isValid) {
      return <div className="flex flex-row justify-center items-center"><div className="font-semibold text-xl">Valid!</div> <BadgeCheck className="text-green-400 w-12" /> </div>
    }
    else return <div className="flex flex-row justify-center items-center"><div className="font-semibold text-xl">Invalid!</div>> <XIcon className="text-red-400 w-12" /> </div>
  }

  render() {
    return (
      <div className="bg-white rounded p-4">
        <div className="text-2xl font-bold">Paste Proof Document Here:</div>
        <CodeEditor 
          name="proofDocument" 
          language="json"
          className="w-full min-h-70vh rounded bg-gray-100" 
          onChange={this.onChange} 
          value={this.state.proofDocument} 
          ref={(textarea) => this.textArea = textarea}
        />

        <Button onClick={this.verifyProof} className="mt-3">Verify Proof</Button>
        {this.props.isVerifying === false && <div>
          {this.renderIsValid()}
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isVerifying: state.credentials.verifying,
    isValid: state.credentials.isValid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyProof: (document) => dispatch(verifyProof(document)),
    resetVerifying: () => dispatch({ type: IS_VERIFYING })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCredentialPage);