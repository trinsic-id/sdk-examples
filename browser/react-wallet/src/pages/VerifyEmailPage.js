import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { verifyEmail } from '../actions';
import Button from '../components/Button';

export class VerifyEmailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      securityCode: ""
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  verify = (e) => {
    e.preventDefault();
    this.props.verify(this.state.securityCode);
  }

  render() {
    if (this.props.loggedIn) {
      return <Navigate to="/" />
    }
    return (
      <div className='w-full flex mt-8 items-center justify-center'>
        <div className='max-w-sm bg-white rounded shadow-md p-8 pt-12 mt-4'>
          <h1 className='text-3xl font-bold mb-4'>Verify Email</h1>
          <hr />

          <form className='mt-4' onSubmit={this.verify}>
            <div className='mt-4'>
              <label className='font-bold'>Security Code</label>
              <input
                name="securityCode"
                type="text"
                className='block w-full border border-black  rounded mt-1 py-1 px-2'
                onChange={this.onChange}
                value={this.state.securityCode}
              />
            </div>

            <Button className="w-full mt-4" type="submit">Verify</Button>
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
    verify: (securityCode) => dispatch(verifyEmail(securityCode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage);