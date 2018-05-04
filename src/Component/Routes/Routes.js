import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './Routes.css';

import Register from '../Register/Register';
import LogIn from '../LogIn/LogIn';
import SignOut from '../SignOut/SignOut';
import Home from '../Home/Home';
import Accounts from '../Accounts/Accounts';
import Restaurant from '../Restaurant/Restaurant';

class Routes extends Component {
  constructor() {
      super();
      this.state =
      {
        Users : []
      };
    }

    // fetch the user's info from express
    componentDidMount() {
      fetch('/user')
        .then(res => res.json())
        .then(user => this.setState({ Users: user }))
    }

    render () {
      // check if the user is logged in using the info provided by express
      let loggedIn = false;
      if(this.state.Users.loggedIn === true){
        loggedIn = true
      }


      // adjust the link accordingly to the log in status of the user
      let status = null;
      let registerable = null;
      let accountInfo = null;
      if(loggedIn === false) {
        status = (
          <li><Link to="/login">Log In</Link></li>
        )
        registerable = (
          <li><Link to="/register">Register</Link></li>
        )
      } else {
        status = (
          <li><Link to="/signout">Sign Out</Link></li>
        )
        accountInfo = (
          <li><Link to="/user">Account</Link></li>
        )
      }
      console.log("Hello from Routes " + this.state.Users);

        return (
            <div>
              <header className='Routes'>
                    <nav>
                      <ul>
                          { registerable }
                          { status }
                          { accountInfo }
                          <li><Link to="/">Home</Link></li>
                      </ul>
                  </nav>
              </header>

              <Route path="/" exact component={ Home } />
              <Route path="/user" exact component={ Accounts } />
              <Route path="/register" exact component={ Register } />
              <Route path="/login" exact component={ LogIn } />
              <Route path="/SignOut" exact component={ SignOut } />
              <Route path="/restaurant/:resID" exact component={ Restaurant }/>
            </div>
        );
    }
}
export default Routes;
