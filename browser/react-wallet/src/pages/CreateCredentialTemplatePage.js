import React from "react";
import { connect } from "react-redux";
import { Button } from "../components/Button";
import { createCredentialTemplate } from "../actions";
import { Input } from "../components/Inputs/Input";
import { DynamicInput } from "../components/Inputs";
const FieldType = require("@trinsic/trinsic").FieldType;

class CreateCredentialTemplatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      templateName: "",
      fields: {}
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onAttributesChange = (attributes, descriptions, optionals, types) => {
    let fields = {};
    attributes.forEach((attribute, index) => {
      fields[attribute] = {};
      fields[attribute].description = descriptions[index];
      fields[attribute].optional = optionals[index];
      switch (types[index]) {
        case "string":
          fields[attribute].type = FieldType.STRING;
          break;
        case "number":
          fields[attribute].type = FieldType.NUMBER;
          break;
        case "bool":
          fields[attribute].type = FieldType.BOOL;
          break;
        case "datetime":
          fields[attribute].type = FieldType.DATETIME;
          break;
        default:
          fields[attribute].type = FieldType.STRING;
          break;
      }
      fields[attribute].type = types[index];
      
    });

    this.setState({
      fields
    })
  }

  submit = (e) => {
    e.preventDefault();
    const { templateName, fields } = this.state;
    this.props.createTemplate(templateName, fields);
  }

  render() {
    return (
      <div className="w-full flex flex-col px-4">
        <div className="w-full shadow-lg box-border border-2">
          <div className="p-2 text-lg font-semibold">Credential Template Creator</div>
          <form onSubmit={this.submit}>
            <div className="px-2">
                <label>Template Name</label>
                <Input className="w-5/6" name="templateName" value={this.state.templateName} onChange={this.onChange} required />
                <DynamicInput onChange={this.onAttributesChange} />
            </div>
         
            <div className="flex justify-center space-x-4 p-4">
              <Button className="w-1/2" type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schema: state.templates.schema
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTemplate: (name, fields) => dispatch(createCredentialTemplate(name, fields))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCredentialTemplatePage);
