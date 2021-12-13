import React from 'react';

export class LoginPage extends React.Component {
  render() {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='w-1/6 bg-white rounded shadow-md p-8 pt-12 mt-4'>
          <h1 className='text-3xl font-bold mb-4'>Login</h1>
          <hr />

          <form className='mt-4' onSubmit={() => alert('Submitted!')}>
            <div className='mt-4'>
              <label className='font-bold'>Email</label>
              <input
                type="email"
                className='block w-full border border-black  rounded mt-1 py-1 px-2'
                placeholder='name@provider.com'
              />
            </div>

            <div className='mt-4'>
              <label className='font-bold'>Full Name</label>
              <input
                type="text"
                className='block w-full border border-black  rounded mt-1 py-1 px-2'
                placeholder='John Doe'
              />
            </div>

            <button
              type='submit'
              className='mt-8 w-full bg-blue-500 py-2 rounded font-semibold shadow-sm text-white hover:bg-blue-600 transition'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;