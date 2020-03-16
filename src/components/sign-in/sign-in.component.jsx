import React from 'react';
import {connect} from 'react-redux'; 

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.action';

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
    const {emailSignInStart} = this.props;
    const {email, password} = this.state;
    emailSignInStart(email, password);
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  render() { 
    const {googleSignInStart} = this.props
    return ( 
      <div className='sign-in'>
        <h1>I already have an account</h1>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput label='email' type='email' name='email' value={this.state.email} handleChange={this.handleChange} required/>
          <FormInput label='password' type='password' name='password' value={this.state.password} handleChange={this.handleChange} required/>

          <div className='buttons'>
          <CustomButton type='submit' > Sign In</CustomButton>
          <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn> {' '}Sign In With Google{' '}</CustomButton>
          </div>
        </form>
      </div>
      );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);