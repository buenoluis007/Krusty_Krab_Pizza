import React, { Component } from 'react';
import './SignOut.css';

class SignOut extends Component {
  render() {
    return (
      <form className="signOut" action='/signout' method='POST'>
        <button
          id="enter"
          type="submit"
          name="button"
          className="signOutButton">Sign Out</button>
      </form>
    )
  }
}

export default SignOut;
