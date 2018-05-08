import React, { Component } from 'react';

import './ShoppingCart.css'

class CartHeading extends Component{
  render(){
    const Restaurant = this.props.cart.getRestaurant();
    return(
      <div>
        <center>
          <p>{Restaurant.name}<br/>
          {Restaurant.address}<br/>
          {Restaurant.phoneNum}</p>
        </center>
      </div>
    );
  }
}

class CartItem extends Component{
  render(){
    const item = this.props.item
    const index = this.props.index
    return[
      <tr height='60px' valign='top'>
        <td width="70px">
          <input type='number' min='1' max='99' style={{textAlign:'left', width:'40px'}}
            value={item.qty}
            onChange={(e)=>this.props.onUpdateItem(index,e.target.value)}>
          </input>
        </td>
        <td width="">
          { item.foodName }
        </td>
        <td align='center' width='40px'>
          <button class='rbutton' onClick={()=>this.props.onRemoveItem(index)}>
            X
          </button>
        </td>
        <td width="90px" align='right'>
          ${ (item.price*item.qty).toFixed(2) }
        </td>
      </tr>
    ];
  }
}

class CartTotals extends Component{
  render(){
    const receipt = this.props.cart.getReceipt();
    let discount = null;

    if (receipt.discountpct !== 0)
      discount = [
        <tr>
          <td colspan="3"> Discount({receipt.discountpct*100}%): </td>
          <td align='right'> ${receipt.discount.toFixed(2)} </td>
        </tr>
      ];

    return[
      discount,
      <tr>
        <td colspan="3"> Subtotal: </td>
        <td align='right'>${receipt.subtotal.toFixed(2)}</td>
      </tr>,
      <tr>
        <td colspan="3">Tax({receipt.taxpct*100}%):</td>
        <td align='right'>${receipt.tax.toFixed(2)}</td>
      </tr>,
      <tr>
        <td colspan="3">Total:</td>
        <td align='right'>${receipt.total.toFixed(2)}</td>
      </tr>,
      <tr height='50px' valign='bottom'>
        <td colspan="4" align='center'>
          <a href='/checkout'><button class='cbutton'>Check Out</button></a>
        </td>
      </tr>
    ];
  }
}

class ShoppingCart extends Component {
    render() {
      let body = null;

      body = this.props.cart.getItems().map((item, index) =>
        <CartItem item={item} index={index}
          onRemoveItem={this.props.onRemoveItem}
          onUpdateItem={this.props.onUpdateItem}/>
      );
      return (
        <div>
          <div class="cartlist" align="center">
            <CartHeading cart={this.props.cart}/>
            <table border="0" width="400px">
                { body }
                <CartTotals cart={this.props.cart}/>
            </table>
          </div>
        </div>
      )
    }
}


export default ShoppingCart;
