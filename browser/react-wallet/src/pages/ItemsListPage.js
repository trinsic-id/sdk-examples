import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { createProof, getWalletItems } from '../actions';
import Button from '../components/Button';
import Modal from '../components/Modal';

export class ItemsListPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showDetailsModal: false,
      attributes: [],
      values: [],
      item: {},
      showProof: false,
    };
  }
  componentDidMount() {
    this.props.fetchItems();
  }

  showDetails = (item) => {
    this.setState({
      item: item,
      showDetailsModal: true,
      attributes: Object.keys(item.data),
      values: Object.values(item.data)
    });
  }

  closeModal = () => {
    this.setState({
      showDetailsModal: false,
      showProof: false
    });
  }

  renderAttribute = (i) => {
    if (typeof(this.state.values[i]) === 'object') {
      return JSON.stringify(this.state.values[i])
    }

    return this.state.values[i];
  }

  generateProof = () => {
    this.props.createProofRequest(this.state.item.id);
    this.setState({
      showProof: true
    })
  }

  render() {
    return (
      <div>
        <table className="w-full min-w-lg divide-y divide-gray-200 break-all bg-white shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left pl-4">ID</th>
              <th>Type</th>
              <th>Issuance Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item, i) => 
              <tr key={i} className='hover:bg-gray-100 text-center cursor-pointer' onClick={() => this.showDetails(item)}>
                <td className="text-left pl-4">{item.id}</td>
                <td>{JSON.stringify(item.data.type)}</td>
                <td>{new Date(item.data.issuanceDate).toLocaleDateString()}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal open={this.state.showDetailsModal} onClose={this.closeModal}>
          <table className="w-full min-w-lg divide-y divide-gray-200 break-all bg-white shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left pl-4">Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className='hover:bg-gray-100 text-left'>
                <td className="pl-4 whitespace-nowrap">Item ID</td>
                <td className="pl-4">{this.state.item.id}</td>
              </tr>
              <tr className='hover:bg-gray-100 text-left'>
                <td className="pl-4 whitespace-nowrap">Wallet ID</td>
                <td className="pl-4">{this.state.item.walletId}</td>
              </tr>
              {this.state.attributes.map((attribute, i) => {
                return (
                  <tr key={i} className='hover:bg-gray-100 text-left'>
                    <td className="pl-4 whitespace-nowrap">{attribute}</td>
                    <td className="pl-4">{this.renderAttribute(i)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button className="w-full" onClick={this.generateProof}>Generate Proof</Button>
          {this.state.showProof && 
            <CodeEditor
              name="proof" 
              language="json" 
              className="w-ful rounded bg-gray-100" 
              value={JSON.stringify(this.props.proofDocument)} 
            />
          }
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.wallet.items,
    proofDocument: state.credentials.proofDocument
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => dispatch(getWalletItems()),
    createProofRequest: (itemId) => dispatch(createProof(itemId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsListPage);