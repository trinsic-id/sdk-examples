import React from "react";
import { connect } from "react-redux";
import { getCredentialTemplates } from "../actions";
import { Modal } from "../components/Modal";

class CredentialTemplatesPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false,
      template: {}
    }
  }

  async componentDidMount() {
    this.props.fetchTemplates()
  }

  selectTemplate = (template) => {
    this.setState({
      open: true,
      template: template
    })
  }

  render() {
    return (
      <div className="w-full px-8">
        <div className="border-2 shadow-lg rounded-lg overflow-auto">
          <table className="w-full min-w-lg divide-y divide-gray-200 break-all bg-white">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left pl-4">Name</th>
                <th>Version</th>
                <th>EcosystemId</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(this.props.templates) && this.props.templates.map((template, i) => 
                <tr key={i} className="hover:bg-gray-50 text-center cursor-pointer" onClick={() => this.selectTemplate(template)}>
                  <td className="text-left pl-4">{template.name}</td>
                  <td>{template.version}</td>
                  <td>{template._ecosystemId}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Modal open={this.state.open} onClose={() => this.setState({ open: false })}>
          <table className="w-full divide-y divide-gray-200 break-all bg-white text-left">
            <thead>
              <tr className="bg-gray-50">
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.state.template.id && Object.keys(this.state.template).map((key, index) => <tr key={index}>
                <td>{key}</td>
                <td>{typeof (this.state.template[key]) === "object" ? JSON.stringify(this.state.template[key]) : this.state.template[key]}</td>
              </tr>)}
            </tbody>
          </table>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let items = state.templates.items;
  return {
    templates: Array.isArray(items) ? items : []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTemplates: () => dispatch(getCredentialTemplates())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CredentialTemplatesPage);
