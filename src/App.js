import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';

import ShopPage from './pages/shop/shop.compnents';
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import HomePage from './pages/homepage/homepage.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.action';

class App extends React.Component {
  unsuscribeFromAuth = null;
  
  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log(userAuth)
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          })
        }

        setCurrentUser(userAuth)
      });
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
        <Route exact path='/shop' component={ShopPage}></Route>
        <Route exact path='/signin' render={() => this.props.currentUser? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}></Route>
      </Switch>
    </div>
  );
  }
}

const mapStateToprops = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToprops, mapDispatchToProps)(App);
