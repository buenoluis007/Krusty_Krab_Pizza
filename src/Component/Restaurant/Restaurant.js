import React, { Component } from 'react';

class Restaurant extends Component{
  constructor(props) {
    super(props);
    this.state = {
      placeID: this.props.match.params.placeID,
      restInfo: []
    }
  }
  componentDidMount() {
    fetch('/restaurant/' + this.state.placeID)
      .then(res => res.json())
      .then(rest => this.setState({ restInfo: rest }))
  }

  render() {
      console.log(this.state.restInfo)
      console.log(this.state.placeID);
    return (
      <div>
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
