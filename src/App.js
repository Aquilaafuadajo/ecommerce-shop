import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ShopPage from './pages/shop/shop.compnents';
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {auth} from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super()
    this.state= {
      currentUser: null
    }
  }

  unsuscribeFromAuth = null;
  componentDidMount(){
    this.unsuscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})

      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsuscribeFromAuth()
  }

  render(){
    return(
      <div>
      <Header currentUser={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/shop' component={ShopPage}></Route>
        <Route exact path='/signin' component={SignInAndSignUpPage}></Route>
      </Switch>
    </div>
  );
  }
}

export default App;
