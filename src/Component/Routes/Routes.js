import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './Routes.css';

import Register from '../Register/Register';
import LogIn from '../LogIn/LogIn';
import SignOut from '../SignOut/SignOut';
import Home from '../Home/Home';
import Accounts from '../Accounts/Accounts';

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
      fetch('/users')
        .then(res => res.json())
        .then(user => this.setState({ Users: user }))
    }

    render () {
      // check if the user is logged in using the info provided by express
      let logIn = false;
      if(this.state.Users.status === true){
        logIn = true
      }

      // adjust the link accordingly to the log in status of the user
      let status = null;
      let registerable = null;
      let accountInfo = null;
      if(logIn === false) {
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
          <li><Link to="/users">Account</Link></li>
        )
      }

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

              <Route path="/users" exact component={ Accounts } />
              <Route path="/register" exact component={ Register } />
              <Route path="/login" exact component={ LogIn } />
              <Route path="/SignOut" exact component={ SignOut } />
              <Route path="/" exact component={ Home } />
            </div>
        );
    }
}

export default Routes;
