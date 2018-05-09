import React, { Component } from 'react';

import './ProcessOrder.css'

class ProcessOrder extends Component {
  constructor(props) {
      super(props);
      this.state =
      {
      };
    }

  componentDidMount() {
    this.props.onClearCart();
  }

  render() {
    return (
      <div className='pcontainter' align='center'>
        <h1>Thank You For Your Purchase!<br/>
        Your Order Is Being Processed</h1>
      </div>
    );
  }
}


export default ProcessOrder;
