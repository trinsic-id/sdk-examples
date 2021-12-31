import React from 'react';
import Button from '../components/Button';
import { Input } from '../components/Input';

export class StoreItemPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: "",
      selectedFile: null
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onFileChange = (e) => {
    this.setState({ 
      selectedFile: e.target.files[0] 
    });
    
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (res) => {
      this.setState({
        item: res.target.result
      })
    };
    reader.onerror = (err) => alert(err);

    reader.readAsText(file);
  };

  render() {
    return (
      <div className="w-full">
        <div className="rounded w-72 md:w-80 lg:w-full ml-2 p-6 bg-white shadow">
          <h1 className="font-bold text-xl mb-4">Store Credential</h1>
          <textarea name="item" className="w-full min-h-70vh p-2 rounded bg-gray-100" onChange={this.onChange} value={this.state.item} />
          <div className="flex gap-2 w-full justify-end text-sm md:text-base lg:text-lg mt-4">
          <label className="flex items-center justify-center w-1/2 lg:w-1/3 bg-transparent hover:bg-primary-500 text-primary-500 font-semibold hover:text-white border border-primary-500 hover:border-transparent rounded-full cursor-pointer">
            <Input type="file" accept=".json, .jsonld" className="hidden" onChange={this.onFileChange} />
            <span>Upload</span>
          </label>
            <Button className="w-1/2 lg:w-1/3">Insert</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default StoreItemPage;