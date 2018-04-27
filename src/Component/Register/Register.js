import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
    render() {
        return (
          <div>
            <form className="signUp" action="/registercheck" method="POST">
                <h1>Register to Krusty Krab Pizza System</h1>
                <p>Enter your first name:</p>
                <p><input type="text" name="fName" placeholder="First Name" required/></p>
                <p>Enter your last name:</p>
                <p><input type="text" name="lName" placeholder="Last Name" required/></p>
                <p>Enter your email address:</p>
                <p><input type="email" name="email" placeholder="Email Address" required/></p>
                <p>Enter your home address:</p>
                <p><input type="text" name="address" placeholder="Home Address" required/></p>
                <p>Enter a password:</p>
                <p> <input type="password" name="pass1" required minLength="4" maxLength="16" size="16"/> </p>
                <p>Verify your password:</p>
                <p> <input type="password" name="pass2" required minLength="4" maxLength="16" size="16"/> </p>
                <p>Finished? Submit your information</p>
                <button className="signUpButton" type="submit" name="button">Submit</button>
            </form>
        </div>
      )
    }
}

export default Register;
