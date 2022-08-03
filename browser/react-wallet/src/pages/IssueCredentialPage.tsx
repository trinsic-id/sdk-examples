import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from '../components/Button';
import { Input } from '../components/Inputs';
import Toast from '../components/Toast';
import { closeNotification, getCredentialTemplates, issueCredential, sendCredential } from '../actions';
import Modal from '../components/Modal';
import {OnChangeType} from "../types";
import {Dispatch} from "redux";

export type IssueCredentialStateType = {
  credentialTemplate: string,
  selectedTemplate: any,
  fields: {},
  credential: any,
  showCopiedToast: boolean,
  openModal: boolean,
  email: string,
  emailSent: boolean
}
export type IssueCredentialPropsType = {
  templates: any[]
  signedCredential: any
  credentialSent: boolean

  closeNotification: () => any

  fetchTemplates(): any
  issueCredential(id: string, fields: {}): any
  sendToWallet(credential: {}, email: string): any
};

export class IssueCredentialPage extends React.Component<IssueCredentialPropsType, IssueCredentialStateType> {
  private textArea: HTMLTextAreaElement | null = null;
  constructor(props: IssueCredentialPropsType | Readonly<IssueCredentialPropsType>) {
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

  componentDidUpdate(prevProps: { signedCredential: any; credentialSent: boolean; }) {
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

  onSelect(e: OnChangeType) {
    let selectedTemplate = this.props.templates.find(template => template.name === e.target.value);

    // @ts-ignore
    this.setState({
      [e.target.name]: e.target.value,
      selectedTemplate: selectedTemplate
    });
  }

  onChange(e: OnChangeType) {
    // @ts-ignore
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onFieldChange(e: OnChangeType) {
    let fields = this.state.fields;
    // @ts-ignore
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    })
  }

  issueCredential() {
    this.props.issueCredential(this.state.selectedTemplate.id, this.state.fields)
  }

  sendToWallet() {
    this.props.sendToWallet(this.state.credential, this.state.email);
  }

  copyToClipboard() {
    // @ts-ignore
    const el = this.textArea;
    el.select();
    // navigator.clipboard.readText().then(clipText => document.querySelector())
    document.execCommand("copy");

    this.setState({
      showCopiedToast: true
    });
  }

  onCloseCopiedToast() {
    this.setState({
      showCopiedToast: false
    })
  }

  openModal() {
    this.setState({
      openModal: true
    })
  }

  closeModal() {
    this.setState({
      openModal: false
    })
  }

  renderTemplateFields() { 
    if (!this.state.selectedTemplate) return;
    const fields = this.state.selectedTemplate.fields;
    const keys = Object.keys(fields);
    return keys.map((key, index) =>
      <div key={index}>
        <label>{key}</label>
        <Input name={key} value={this.state[key]} onChange={this.onFieldChange.bind(this)} />
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
              onChange={this.onSelect.bind(this)}
            >
              {this.props.templates.map((template, index) => 
                <option key={index} value={template.name}>{template.name}</option>
              )}
            </Input>
            <hr className="border-2 mt-5 mb-2" />
            {this.renderTemplateFields()}
          </form>
          <Button className="w-full my-4" onClick={this.issueCredential.bind(this)}>Issue</Button>
        </div>
       
        <div className="rounded w-full lg:w-1/2 p-6 bg-white shadow">
          <h1 className="font-bold text-xl mb-4">Issue Credential</h1>
          <CodeEditor 
            name="credential" 
            language="json"
            className="w-full min-h-70vh rounded bg-gray-100" 
            onChange={this.onChange.bind(this)}
            value={this.state.credential} 
            ref={(textarea) => this.textArea = textarea}
          />
          <div className="flex gap-2 w-full justify-end text-sm md:text-base lg:text-lg mt-4">
            <Button variant="outline" className="w-1/2" onClick={this.copyToClipboard.bind(this)}>Copy to clipboard</Button>
            <Button className="w-1/2" onClick={this.openModal.bind(this)}>Send To Wallet</Button>
          </div>
        </div>
        <Toast color="green" show={this.state.showCopiedToast} onClose={this.onCloseCopiedToast.bind(this)}>Copied!</Toast>
        <Toast className="z-50" color="green" show={this.state.emailSent} onClose={this.props.closeNotification}>Credential Sent to Wallet! :)</Toast>
        <Modal open={this.state.openModal} onClose={this.closeModal.bind(this)} className="max-w-md">
          <div className="text-left w-full">
            <label >Enter the email of the recipient:</label>
            <Input name="email" value={this.state.email} onChange={this.onChange.bind(this)}></Input>
          </div>
          <Button className="w-full my-5" onClick={this.sendToWallet.bind(this)}>Send Credential</Button>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state: { credentials: { signedCredential: any; credentialSent: any; }; templates: { items: any; }; }) {
  return {
    signedCredential: state.credentials.signedCredential,
    templates: state.templates.items,
    credentialSent: state.credentials.credentialSent
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchTemplates: () => (getCredentialTemplates()),
    issueCredential: (templateId: string, fields: any) => (issueCredential(templateId, fields)),
    sendToWallet: (credential: any, email: string) => (sendCredential(credential, email)),
    closeNotification: () => (closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueCredentialPage);