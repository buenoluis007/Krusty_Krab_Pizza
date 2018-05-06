import React, { Component } from 'react';

import './ShoppingCart.css'

class CartHeading extends Component{
  render(){
    return(
      <div></div>
    );
  }
}

class CartItem extends Component{
  render(){
    return(
      <div></div>
    );
  }
}

class CartTotals extends Component{
  render(){
    return(
      <div></div>
    );
  }
}

class ShoppingCart extends Component {
  constructor(props) {
      super(props);
      this.state =
      {
        Restaurant: [],
        Totals: [],
        Items: []
      };
    }

    componentDidMount() {
      fetch('/restaurantInfo?id=1')
        .then(res => res.json())
        .then(info => this.setState({ Restaurant: info }));
      fetch('/receipt')
        .then(res => res.json())
        .then(info => this.setState({ Totals: info }));
      fetch('/shoppingCart')
        .then(res => res.json())
        .then(info => this.setState({ Items: info }));
    }

    render() {

      let heading = null;
      let body = null;
      let totals = null;

      heading = (
        <div>
          <center>
            <p>{this.state.Restaurant.name}</p>
            <p>{this.state.Restaurant.address}</p>
            <p>{this.state.Restaurant.phoneNum}</p>
          </center>
        </div>
      );

      body = this.props.cart.getItems().map((item, index) =>
        <tr>
          <td width="50%">{ item.foodName }</td>
          <td width="20%">{ item.qty }</td>
          <td width="30%" align='right'>${ item.price.toFixed(2) }</td>
        </tr>
      );

      let receipt = this.props.cart.getReceipt();
      totals = [
        <tr>
          <td colspan="2"> Discount({receipt.discountpct*100}%): </td>
          <td> ${receipt.discount.toFixed(2)} </td>
        </tr>,
        <tr>
          <td colspan="2"> Subtotal: </td>
          <td>${receipt.subtotal.toFixed(2)}</td>
        </tr>,
        <tr>
          <td colspan="2">Tax({receipt.taxpct*100}%):</td>
          <td>${receipt.tax.toFixed(2)}</td>
        </tr>,
        <tr>
          <td colspan="2">Total:</td>
          <td>${receipt.total.toFixed(2)}</td>
        </tr>
      ];

      return (
        <div>
          <div class="cartlist" align="center">
            { heading }
            <table border="1" width="400px" bgcolor="white">
                { body }
                { totals }
            </table>
          </div>
        </div>
      )
    }
}


export default ShoppingCart;
