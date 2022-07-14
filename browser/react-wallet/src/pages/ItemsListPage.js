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
        <table className="w-full break-all bg-white divide-y divide-gray-200 shadow min-w-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="pl-4 text-left">ID</th>
              <th>Type</th>
              <th>Issuance Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item, i) => 
              <tr key={item.id} className='text-center cursor-pointer hover:bg-gray-100' onClick={() => this.showDetails(item)}>
                <td className="pl-4 text-left">{item.id}</td>
                <td>{JSON.stringify(item.type)}</td>
                <td>{new Date(item.issuanceDate).toLocaleDateString()}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal open={this.state.showDetailsModal} onClose={this.closeModal}>
          <table className="w-full break-all bg-white divide-y divide-gray-200 shadow min-w-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="pl-4 text-left">Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.state.attributes.map((attribute, i) => {
                if (attribute !== "proof") {
                  return (
                    <tr key={i} className='text-left hover:bg-gray-100'>
                      <td className="pl-4 whitespace-nowrap">{attribute}</td>
                      <td className="pl-4">{this.renderAttribute(i)}</td>
                    </tr>
                  );
                }
                return <tr key={i}></tr>;
              })}
            </tbody>
          </table>
          <Button className="w-full" onClick={() => this.setState({ showProof: true })}>Generate Proof</Button>
          {this.state.showProof && 
            <CodeEditor
              name="proof" 
              language="json" 
              className="bg-gray-100 rounded w-ful" 
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