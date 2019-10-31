import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ShopPage from './pages/shop/shop.compnents'
import './App.css';
import HomePage from './pages/homepage/homepage.component';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/shop' component={ShopPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
