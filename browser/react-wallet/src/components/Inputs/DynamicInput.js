import React from 'react';
import { AddIcon, TrashIcon } from '../Icons';
import { Input } from './Input';

export class DynamicInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [""],
      descriptions: [""],
      optional: [false],
      types: ["string"]
    }
  }

  addInput = () => {
    this.setState({
      attributes: [...this.state.attributes, ""],
      descriptions: [...this.state.descriptions, ""],
      optional: [...this.state.optional, false],
      types: [...this.state.types, "string"]
    });
  }

  removeInput = (index) => {
    let { attributes, descriptions, optional, types } = this.state
    attributes.splice(index, 1);
    descriptions.splice(index, 1);
    optional.splice(index, 1);
    types.splice(index, 1);
    this.setState({ attributes, descriptions, optional, types })

    if (this.props.onChange) {
      this.props.onChange(attributes, descriptions, optional, types);
    }
  }

  handleChange = (e, index) => {
    let { attributes, descriptions, optional, types } = this.state;
    attributes[index] = e.target.value;
    this.setState({ attributes: attributes })

    if (this.props.onChange) {
      this.props.onChange(attributes, descriptions, optional, types);
    }
  }

  handleDescriptionsChange = (e, index) => {
    let { attributes, descriptions, optional, types } = this.state;
    descriptions[index] = e.target.value;
    this.setState({ descriptions: descriptions })

    if (this.props.onChange) {
      this.props.onChange(attributes, descriptions, optional, types);
    }
  }

  handleOptionalChange = (e, index) => {
    let { attributes, descriptions, optional, types } = this.state;
    optional[index] = e.target.value;
    this.setState({ optional: optional })

    if (this.props.onChange) {
      this.props.onChange(attributes, descriptions, optional, types);
    }
  }

  handleTypesChange = (e, index) => {
    let { attributes, descriptions, optional, types } = this.state;
    types[index] = e.target.value;
    this.setState({ types: types })

    if (this.props.onChange) {
      this.props.onChange(attributes, descriptions, optional, types);
    }
  }

  render() {
    return (
      <>
        {this.state.attributes.map((attribute, index) => (
          <div className="w-full relative" key={index}>
            <div className="flex flex-wrap gap-1  my-1 w-11/12">
              <div>
                {index === 0 && <label className="inline-flex items-center">
                  Attribute 
                  <AddIcon className="w-4 ml-2 cursor-pointer bg-green-400 hover:bg-green-600 rounded-full" onClick={this.addInput} alt="+"/>
                </label>}
                <Input
                  className="h-8"
                  onChange={(e) => this.handleChange(e, index)}
                  placeholder={"Enter attribute" + (index + 1)}
                  required
                />
              </div>
              <div className="flex-grow">
                {index === 0 && <label>Description</label>}
                <Input
                  className="h-8"
                  onChange={(e) => this.handleDescriptionsChange(e, index)}
                  placeholder="Description"
                />
              </div>
              <div>
                {index === 0 && <label>Optional</label>}
                <Input
                  type="select"
                  className="h-8"
                  required={attribute && attribute !== ""}
                  value={this.state.optional[index]}
                  onChange={(e) => this.handleOptionalChange(e, index)}
                >
                  <option value={false}>false</option>
                  <option value={true}>true</option>
                </Input>
              </div>
              <div>
                {index === 0 && <label>Type</label>}
                <Input
                  type="select"
                  className="h-8"
                  required={attribute && attribute !== ""}
                  value={this.state.types[index]}
                  onChange={(e) => this.handleTypesChange(e, index)}
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="bool">Boolean</option>
                  <option value="datetime">Datetime</option>
                </Input>
              </div>
            </div>
            {index > 0 &&
              <div
                className="cursor-pointer absolute right-2 top-1"
                onClick={() => this.removeInput(index)}
              >
                <TrashIcon className="w-4 cursor-pointer hover:text-red-400" />
              </div>
            }
          </div>
        ))}
      </>
    );
  }
}