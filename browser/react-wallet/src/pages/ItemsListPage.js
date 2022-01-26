import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { getWalletItems } from '../actions';
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
      attributes: Object.keys(item),
      values: Object.values(item)
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
                <td>{JSON.stringify(item.type)}</td>
                <td>{new Date(item.issuanceDate).toLocaleDateString()}</td>
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
              {this.state.attributes.map((attribute, i) => {
                if (attribute !== "proof") {
                  return (
                    <tr key={i} className='hover:bg-gray-100 text-left'>
                      <td className="pl-4 whitespace-nowrap">{attribute}</td>
                      <td className="pl-4">{this.renderAttribute(i)}</td>
                    </tr>
                  );
                }
                return <div></div>;
              })}
            </tbody>
          </table>
          <Button className="w-full" onClick={() => this.setState({ showProof: true })}>Generate Proof</Button>
          {this.state.showProof && 
            <CodeEditor
              name="proof" 
              language="json" 
              className="w-ful rounded bg-gray-100" 
              value={JSON.stringify(this.state.item.proof)} 
            />
          }
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.wallet.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => dispatch(getWalletItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsListPage);