import React from 'react';
import Button from '../components/Button';
import { Input } from '../components/Input';

export class IssueCredentialPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentialTemplate: "",
      name: "",
      dateReceived: "",
      expirationDate: "",
      credential: ""
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  copyToClipboard = () => {
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
    alert("copied");
  }

  download = (e) => {

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
              onChange={this.onChange}
            >
              <option>Vaccination Card</option>
              <option>Drivers License</option>
              <option>Business Card</option>
            </Input>
            <hr className="border-2 mt-5 mb-2" />
            <label className="block mt-5">Name:</label>
            <Input 
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            <label className="block mt-5">Date Received:</label>
            <Input 
              name="dateReceived"
              value={this.state.dateReceived}
              onChange={this.onChange}
            />
            <label className="block mt-5">Expiration Date:</label>
            <Input 
              name="expirationDate"
              value={this.state.expirationDate}
              onChange={this.onChange}
            />
          </form>
          <Button className="w-full my-4">Issue</Button>
        </div>
       
        <div className="rounded w-full lg:w-1/2 p-6 bg-white shadow">
          <h1 className="font-bold text-xl mb-4">Issue Credential</h1>
          <textarea 
            name="credential" 
            className="w-full min-h-70vh p-2 rounded bg-gray-100" 
            onChange={this.onChange} 
            value={this.state.credential} 
            ref={(textarea) => this.textArea = textarea}
          />
          <div className="flex gap-2 w-full justify-end text-sm md:text-base lg:text-lg mt-4">
            <Button variant="outline" className="w-1/2" onClick={this.copyToClipboard}>Copy to clipboard</Button>
            <Button className="w-1/2">Download</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default IssueCredentialPage;