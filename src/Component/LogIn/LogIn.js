import React, { Component } from 'react';
import './LogIn.css'

class LogIn extends Component {
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


    render() {
      // change the login state if the info inputted is wrong
      let retry = null;

      if(this.state.Users.failed === true){
        retry = (
          <div>
            <h2 className='warning'>Please Try Again.</h2>
            <h3 className='warning'>The Email Or Password You've Entered Is Incorrect</h3>
            <form className="login2" action="/logincheck" method="POST">
                <input type="email" name="email" placeholder="email"/>
                <br/>
                <input type="password" name="pass" placeholder="password"/>
                <br/>
                <button
                  id="enter"
                  type="submit"
                  name="button"
                  className="loginButton">Login</button>
              </form>
          </div>
        )
      } else {
        retry = (
          <div>
            <form className="login" action="/logincheck" method="POST">
                <input type="email" name="email" placeholder="email"/>
                <br/>
                <input type="password" name="pass" placeholder="password"/>
                <br/>
                <button
                  id="enter"
                  type="submit"
                  name="button"
                  className="loginButton">Login</button>
              </form>
          </div>
        )
      }


        return (
          <div className="loginDiv">
            <h1 id="loginStatement">Welcome Back</h1>
            { retry }
            <div id="mission">
              <p>Hi there! At Krusty Krab Pizza, we aim to make your life easier when it comes to grabbing a slice of pizza.Hi there! At Krusty Krab Pizza, we aim to make your life easier when it comes to grabbing a slice of pizza.Hi there! At Krusty Krab Pizza, we aim to make your life easier when it comes to grabbing a slice of pizza.Hi there! At Krusty Krab Pizza, we aim to make your life easier when it comes to grabbing a slice of pizza.Hi there! At Krusty Krab Pizza, we aim to make your life easier when it comes to grabbing a slice of pizza.</p>
            </div>
          </div>
      )
    }
}

export default LogIn;
