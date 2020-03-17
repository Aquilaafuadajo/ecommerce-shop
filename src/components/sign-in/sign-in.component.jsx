import React, {useState} from 'react';
import {connect} from 'react-redux'; 

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.action';

const SignIn = ({emailSignInStart, googleSignInStart}) => { 
  const [userCredentials, setCredentials] = useState({email: '', password: ''})

  const {email, password} = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailSignInStart(email, password);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCredentials({...userCredentials, [name]: value})
  }

  return ( 
    <div className='sign-in'>
      <h1>I already have an account</h1>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label='email' type='email' name='email' value={email} handleChange={handleChange} required/>
        <FormInput label='password' type='password' name='password' value={password} handleChange={handleChange} required/>

        <div className='buttons'>
        <CustomButton type='submit' > Sign In</CustomButton>
        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn> {' '}Sign In With Google{' '}</CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);