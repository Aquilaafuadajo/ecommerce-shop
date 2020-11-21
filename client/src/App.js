import React, {useEffect} from 'react';
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
import {fetchCollectionStart} from './redux/shop/shop.actions'


const App = ({ checkUserSession, currentUser, fetchCollectionStart }) => {
  useEffect(() => {
    checkUserSession()
    fetchCollectionStart()
  }, [checkUserSession, fetchCollectionStart])

  return(
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/shop' component={ShopPage}></Route>
        <Route exact path='/checkout' component={CheckoutPage}></Route>
        <Route exact path='/signin' render={() => currentUser? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}></Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchCollectionStart: () => dispatch(fetchCollectionStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);



