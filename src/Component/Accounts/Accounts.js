import React, { Component } from 'react';


class Accounts extends Component {
  constructor() {
      super();
      this.state =
      {
        Users : []
      };
    }

    componentDidMount() {
      fetch('/users')
        .then(res => res.json())
        .then(user => this.setState({ Users: user }))
    }

  render() {
    return (
      <div>
          <h1>Your Email: {this.state.Users.email}</h1>
          <h1>Account Type: {this.state.Users.type}</h1>
      </div>
    )
  }
}

export default Accounts
