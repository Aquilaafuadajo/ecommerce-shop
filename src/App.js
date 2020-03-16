import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';

import ShopPage from './pages/shop/shop.components';
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.action';


class App extends React.Component {
  unsuscribeFromAuth = null;
  
  componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession()
  }

  componentWillUnmount() {
    this.unsuscribeFromAuth()
  }

  render(){
    return(
      <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/shop' component={ShopPage}></Route>
        <Route exact path='/checkout' component={CheckoutPage}></Route>
        <Route exact path='/signin' render={() => this.props.currentUser? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}></Route>
      </Switch>
    </div>
  );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);



