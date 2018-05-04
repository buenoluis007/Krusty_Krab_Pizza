import React, { Component } from 'react';

class Restaurant extends Component{
  constructor(props) {
    super(props);
    this.state = {
      resID: this.props.match.params.resID,
      restInfo: []
    }
  }
  componentDidMount() {
    fetch('/restaurant?id='+this.state.resID)
      .then(res => res.json())
      .then(rest => this.setState({ restInfo: rest }))
  }

  render() {
    return (
      <div>
        {console.log(this.state.restInfo)}
        <h1>Hello</h1>
        <h1>{this.state.resID}</h1>
        <h1>name: {this.state.restInfo.name}</h1>
        <h1>address: {this.state.restInfo.address}</h1>
        <h1>phone number: {this.state.restInfo.phoneNum}</h1>
      </div>
    )
  }
}

export default Restaurant;
