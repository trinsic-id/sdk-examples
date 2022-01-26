import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '../components/Button';
import { Input } from '../components/Inputs';
import Toast from '../components/Toast';
import { closeNotification, getCredentialTemplates, issueCredential, sendCredential } from '../actions';
import Modal from '../components/Modal';

export class IssueCredentialPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentialTemplate: "",
      selectedTemplate: props.templates[0],
      fields: {},
      credential: props.signedCredential,
      showCopiedToast: false,
      openModal: false,
      email: "",
      emailSent: props.credentialSent
    }
  }

  componentDidMount() {
    this.props.fetchTemplates();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signedCredential !== this.props.signedCredential) {
      this.setState({
        credential: this.props.signedCredential
      })
    }
    if (!prevProps.credentialSent && this.props.credentialSent) {
      this.setState({
        openModal: false,
        emailSent: true
      })
    }
    if (prevProps.credentialSent && !this.props.credentialSent) {
      this.setState({
        emailSent: false
      })
    }
  }

  onSelect = (e) => {
    let selectedTemplate = this.props.templates.find(template => template.name === e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
      selectedTemplate: selectedTemplate
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onFieldChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    })
  }

  issueCredential = () => {
    this.props.issueCredential(this.state.selectedTemplate.id, this.state.fields)
  }

  sendToWallet = () => {
    this.props.sendToWallet(this.state.credential, this.state.email);
  }

  copyToClipboard = () => {
    const el = this.textArea;
    el.select();
    // navigator.clipboard.readText().then(clipText => document.querySelector())
    document.execCommand("copy");
    
    this.setState({
      showCopiedToast: true
    });
  }

  onCloseCopiedToast = () => {
    this.setState({
      showCopiedToast: false
    })
  }

  openModal = () => {
    this.setState({
      openModal: true
    })
  }

  closeModal = () => {
    this.setState({
      openModal: false
    })
  }

  renderTemplateFields() { 
    const fields = this.state.selectedTemplate.fields;
    const keys = Object.keys(fields);
    return keys.map((key, index) => 
      <div key={index}>
        <label>{key}</label>
        <Input name={key} value={this.state[key]} onChange={this.onFieldChange} />
      </div>
    );
  }

  render() {
    return (
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="bg-white p-5 rounded shadow w-full lg:w-1/2">
          <form>
            <label className="font-bold text-xl block my-2">Choose Template</label>
            <Input 
              type="select"
              name="credentialTemplate"
              value={this.state.credentialTemplate}
              onChange={this.onSelect}
            >
              {this.props.templates.map((template, index) => 
                <option key={index} value={template.name}>{template.name}</option>
              )}
            </Input>
            <hr className="border-2 mt-5 mb-2" />
            {this.renderTemplateFields()}
          </form>
          <Button className="w-full my-4" onClick={this.issueCredential}>Issue</Button>
        </div>
       
        <div className="rounded w-full lg:w-1/2 p-6 bg-white shadow">
          <h1 className="font-bold text-xl mb-4">Issue Credential</h1>
          <CodeEditor 
            name="credential" 
            language="json"
            className="w-full min-h-70vh rounded bg-gray-100" 
            onChange={this.onChange} 
            value={this.state.credential} 
            ref={(textarea) => this.textArea = textarea}
          />
          <div className="flex gap-2 w-full justify-end text-sm md:text-base lg:text-lg mt-4">
            <Button variant="outline" className="w-1/2" onClick={this.copyToClipboard}>Copy to clipboard</Button>
            <Button className="w-1/2" onClick={this.openModal}>Send To Wallet</Button>
          </div>
        </div>
        <Toast color="green" show={this.state.showCopiedToast} onClose={this.onCloseCopiedToast}>Copied!</Toast>
        <Toast className="z-50" color="green" show={this.state.emailSent} onClose={this.props.closeNotification}>Credential Sent to Wallet! :)</Toast>
        <Modal open={this.state.openModal} onClose={this.closeModal} className="max-w-md">
          <div className="text-left w-full">
            <label >Enter the email of the recipient:</label>
            <Input name="email" value={this.state.email} onChange={this.onChange}></Input>
          </div>
          <Button className="w-full my-5" onClick={this.sendToWallet}>Send Credential</Button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signedCredential: state.credentials.signedCredential,
    templates: state.templates.items,
    credentialSent: state.credentials.credentialSent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTemplates: () => dispatch(getCredentialTemplates()),
    issueCredential: (templateId, fields) => dispatch(issueCredential(templateId, fields)),
    sendToWallet: (credential, email) => dispatch(sendCredential(credential, email)),
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueCredentialPage);