import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../actions';
import Button from '../components/Button';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      goToVerify: false
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.name)
    this.setState({
      goToVerify: true
    })
  }

  render() {
    if (this.state.goToVerify) {
      return <Navigate to="/security" />
    }
    return (
      <div className='w-full flex items-center justify-center pt-32'>
        <div className='max-w-sm bg-white rounded shadow-md p-8 pt-12 mt-4'>
          <h1 className='text-3xl font-bold mb-4'>Login</h1>
          <hr />

          <form className='mt-4' onSubmit={this.login}>
            <div className='mt-4'>
              <label className='font-bold'>Email</label>
              <input
                name="email"
                type="email"
                className='block w-full border border-black  rounded mt-1 py-1 px-2'
                placeholder='name@provider.com'
                onChange={this.onChange}
              />
            </div>

            <div className='mt-4'>
              <label className='font-bold'>Full Name</label>
              <input
                name="name"
                type="text"
                className='block w-full border border-black  rounded mt-1 py-1 px-2'
                placeholder='John Doe'
                onChange={this.onChange}
              />
            </div>

            <Button className="w-full mt-4" type="submit">Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authentication.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, name) => dispatch(login(email, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);