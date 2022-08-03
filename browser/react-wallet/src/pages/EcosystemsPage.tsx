import React from 'react';
import { connect } from 'react-redux';
import { createEcosystem } from '../actions';
import Button from '../components/Button';
import { Input } from '../components/Inputs';

export class EcosystemsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ecosystemName: "",
      description: "",
      uri: "",
      name: props.user.name  ?? "",
      email: props.user.email ?? "",
      sms: ""
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit = (e) => {
    e.preventDefault()
    this.props.createEcosystem(this.state)
  }

  render() {
    return (
      <div className="flex flex-col w-full px-4">
        <div className="box-border w-full border-2 shadow-lg">
          <div className="p-2 text-lg font-semibold">Create An Ecosystem</div>
          <form onSubmit={this.submit}>
            <div className="px-2">
                <label>Ecosystem Name</label>
                <Input className="w-5/6" name="ecosystemName" value={this.state.ecosystemName} onChange={this.onChange} required />
                <label>Description</label>
                <Input className="w-5/6" name="description" value={this.state.description} onChange={this.onChange} />
                <label>uri</label>
                <Input className="w-5/6" name="uri" value={this.state.uri} onChange={this.onChange} />
                <label>Owner Name</label>
                <Input className="w-5/6" name="name" value={this.state.name} onChange={this.onChange} />
                <label>Email</label>
                <Input className="w-5/6" name="email" value={this.state.email} onChange={this.onChange} />
                <label>Sms</label>
                <Input className="w-5/6" name="sms" value={this.state.sms} onChange={this.onChange} />
            </div>
            <div className="flex justify-center p-4 space-x-4">
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
    user: state.authentication.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEcosystem: (ecosystem) => dispatch(createEcosystem(ecosystem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EcosystemsPage);