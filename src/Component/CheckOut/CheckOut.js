import React, { Component } from 'react';

import './CheckOut.css'


class CheckOut extends Component {
  constructor(props) {
      super(props);
      this.state =
      {
        Restaurant: [],
      };
    }

  componentDidMount() {
    fetch('/restaurantInfo?id=1')
      .then(res => res.json())
      .then(info => this.setState({ Restaurant: info }));
  }

  render() {

    return (
      <div>NO SOUP FOR YOU!!</div>
    );
  }
}


export default CheckOut;
