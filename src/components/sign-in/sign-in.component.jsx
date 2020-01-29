import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component'
import {signInWithGoogle} from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends React.Component { 
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: ''
      }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({email: '', password: ''});
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  render() { 
    return ( 
      <div className='sign-in'>
        <h1>I already have an account</h1>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput label='email' type='email' name='email' value={this.state.email} handleChange={this.handleChange} required/>
          <FormInput label='password' type='password' name='password' value={this.state.password} handleChange={this.handleChange} required/>

          <div className='buttons'>
          <CustomButton type='submit' > Sign In</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn> {' '}Sign In With Google{' '}</CustomButton>
          </div>
        </form>
      </div>
      );
  }
}

export default SignIn;