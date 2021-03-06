import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { insertWalletItem } from '../actions';
import Button from '../components/Button';
import { Input } from '../components/Inputs';
import { Toast } from '../components/Toast';

export class StoreItemPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: "",
      selectedFile: null,
      showToast: false
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onFileChange = (e) => {
    e.preventDefault();
    
    this.setState({ 
      selectedFile: e.target.files[0] 
    });
    
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (res) => {
      this.setState({
        item: res.target.result
      });
    };
    reader.onerror = (err) => alert(err);

    reader.readAsText(file);
  };

  onInsert = () => {
    this.props.insertItem(this.state.item);
    this.setState({
      showToast: true
    })
  }

  onCloseToast = (e) => {
    this.setState({
      showToast: false
    })
  }

  render() {
    return (
      <div className="w-full">
        <div className="rounded w-full ml-2 p-6 bg-white shadow">
          <h1 className="font-bold text-xl mb-4">Store Credential</h1>
          <CodeEditor 
            name="item" 
            language="json" 
            className="w-full min-h-70vh rounded bg-gray-100" 
            onChange={this.onChange} 
            value={this.state.item} 
          />
          <div className="flex gap-2 w-full justify-end text-sm md:text-base lg:text-lg mt-4">
          <label className="flex items-center justify-center w-1/2 lg:w-1/3 bg-transparent hover:bg-primary-500 text-primary-500 font-semibold hover:text-white border border-primary-500 hover:border-transparent rounded-full cursor-pointer">
            <Input type="file" accept=".json, .jsonld" className="hidden" onChange={this.onFileChange} />
            <span>Upload</span>
          </label>
            <Button className="w-1/2 lg:w-1/3" onClick={this.onInsert} isBusy={this.props.insertingItem}>Insert</Button>
          </div>
        </div>
        <Toast show={this.state.showToast} onClose={this.onCloseToast} color="green">Item Successfully Added!</Toast>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    insertingItem: state.wallet.insertingItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    insertItem: (item) => dispatch(insertWalletItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreItemPage);