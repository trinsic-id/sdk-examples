import React from "react";
import {connect} from "react-redux";
import {Button} from "../components/Button";
import {createCredentialTemplate} from "../actions";
import {DynamicInput, Input} from "../components/Inputs";
import {CreateCredentialTemplateRequest, FieldType, TemplateField} from "@trinsic/trinsic/lib/browser";
import {ActionState, PreventDefaultType} from "../types";
import {ThunkDispatch} from "redux-thunk";

interface CreateCredentialTemplateProps {
    createTemplate(name: string, fields: { [p: string]: TemplateField }): any
}

class CreateCredentialTemplatePage extends React.Component<CreateCredentialTemplateProps, CreateCredentialTemplateRequest> {
    constructor(props: CreateCredentialTemplateProps | Readonly<CreateCredentialTemplateProps>) {
        super(props);

        this.state = {
            name: "",
            fields: {},
            allowAdditionalFields: false
        }
    }

    onChange(e: { target: { name: any; value: any; }; }) {
        // @ts-ignore
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAttributesChange(attributes: string[], descriptions: { [x: string]: any; }, optionals: { [x: string]: any; }, types: { [x: string]: any; }) {
        let fields: { [key: string]: TemplateField } = {};
        attributes.forEach((attribute, index) => {
            fields[attribute] = {description: descriptions[index], optional: optionals[index], type: FieldType.STRING};
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

    submit(e: PreventDefaultType) {
        e.preventDefault();
        const {name, fields} = this.state;
        this.props.createTemplate(name!, fields!);
    }

    render() {
        return (
            <div className="w-full flex flex-col px-4">
                <div className="w-full shadow-lg box-border border-2">
                    <div className="p-2 text-lg font-semibold">Credential Template Creator</div>
                    <form onSubmit={this.submit.bind(this)}>
                        <div className="px-2">
                            <label>Template Name</label>
                            <Input className="w-5/6" name="name" value={this.state.name}
                                   onChange={this.onChange.bind(this)} required/>
                            <DynamicInput onChange={this.onAttributesChange.bind(this)}/>
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

function mapStateToProps(state: { templates: { schema: any; }; }) {
    return {
        schema: state.templates.schema
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<ActionState, undefined, any>) {
    return {
        createTemplate: (name: string, fields: { [key: string]: TemplateField; }) => dispatch(createCredentialTemplate(name, fields))
    }
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CreateCredentialTemplatePage);
