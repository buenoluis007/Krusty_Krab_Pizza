import React, { Component } from 'react';

import './CheckOut.css'

class CheckOrderItem extends Component{
  render(){
    const item = this.props.item
    const index = this.props.index
    return[
      <tr height='60px' valign='top'>
        <td width="">
          { item.foodName }
        </td>
        <td width="70px">
          <input type='number' min='1' max='99' style={{textAlign:'left', width:'40px'}}
            value={item.qty}
            onChange={(e)=>this.props.onUpdateItem(index,e.target.value)}>
          </input>
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

class CheckOrderTotals extends Component{
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
      <tr>
        <td colspan='4' class='divider'></td>
      </tr>,
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
        <td colspan="3"><b>Total:</b></td>
        <td align='right'><b>${receipt.total.toFixed(2)}</b></td>
      </tr>
    ];
  }
}

class CheckOrder extends Component{
  render(){
    let body = null;

    body = this.props.cart.getItems().map((item, index) =>
      <CheckOrderItem item={item} index={index}
        onRemoveItem={this.props.onRemoveItem}
        onUpdateItem={this.props.onUpdateItem}/>
    );

    return(
      <div class='checkorder'>
        <h2 align='left'>Your Order</h2>
        //add restaurantinfo
        <table border='0' class='ordertable'>
          {body}
          <CheckOrderTotals cart={this.props.cart}/>
        </table>
      </div>
    );
  }
}

class CheckPayment extends Component{
  render(){
    let v = this.props.visitor;
    let p = this.props.pay;
    return[
      <div class='checkpayment'>
        <h2 align='left'>Payment Information</h2>
        <form>
          <table border='0' class='paytable'>
            <tr>
              <td><label>Card Number<br/>
                <input type="text" name='cardnum' size='26' maxlength='16' value={p.creditNum} onChange={(e)=>this.props.onP(e)}/>
              </label></td>
              <td><label>Exp Date(mm/yy)<br/>
                <input type="text" name='exp' size='17' maxlength='5' value={p.expiration} onChange={(e)=>this.props.onP(e)}/>
              </label></td>
            </tr>
            <tr>
              <td><label>CCV<br/>
                <input type="text" name='ccv' size='3' maxlength='3' value={p.ccv} onChange={(e)=>this.props.onP(e)}/>
              </label></td>
            </tr>
            <tr>
              <td width='215' style={{paddingTop:'40px'}}><label>First Name<br/>
                <input type="text" name='f_name' size='26' value={v.f_name} onChange={(e)=>this.props.onV(e)} required/>
              </label></td>
              <td style={{paddingTop:'40px'}}><label>Last Name<br/>
                <input type="text" name='l_name' size='26' value={v.l_name} onChange={(e)=>this.props.onV(e)} required/>
              </label></td>
            </tr>
            <tr>
              <td colspan='2'><label>Address<br/>
                <input type="text" name='address' size='60' value={v.address} onChange={(e)=>this.props.onV(e)} required/>
              </label></td>
            </tr>
            <tr>
              <td colspan='2'><label>Phone Number<br/>
                <input type="text" name='phoneNum' size='35' maxlength='15' value={v.phoneNum} onChange={(e)=>this.props.onV(e)}/>
              </label></td>
            </tr>
          </table>
        </form>
      </div>
    ];
  }
}

class CheckPlaceOrder extends Component{
  render(){
    let selectCooks = [];
    const receipt = this.props.cart.getReceipt();
    console.log('COOK ARRAY: '+JSON.stringify(this.props.cooks));
    selectCooks = (this.props.cooks.map((cook)=>
      <option value={cook.userID}>{cook.f_name} {cook.l_name}</option>
    ));

    return(
      <div className='checksubmit'>
        <table border='0' class='submittable'>
          <tr>
            <td>
              <label>Select Your Cook &ensp;
                <select name='cookID' form='placeorder'>
                  {selectCooks}
                </select>
              </label>
            </td>
            <td align='center'>
              <form name='placeorder' id='placeorder' action='/placeorder' method='post'>
                <input type='hidden' name='address' value={this.props.visitor.address}/>
                <input type='hidden' name='items' value={JSON.stringify(this.props.cart.getItems())}/>
                <input type='hidden' name='user' value={this.props.user.userID}/>
                <input type='hidden' name='restID' value={this.props.restInfo.restaurantID}/>
                <input type='hidden' name='receipt' value={JSON.stringify(this.props.cart.getReceipt())}/>
                <input type='submit' name='submit' value='Place Order'/>
              </form>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class CheckOut extends Component {
  constructor(props) {
      super(props);
      this.state =
      {
        Cooks: []
      };
    }

  componentDidMount() {
    fetch('/getCooks')
      .then(res => res.json())
      .then(info => this.setState({ Cooks: info }));
  }
  render() {
    console.log('WTF: '+JSON.stringify(this.props.restInfo.restaurantID));
    return (
      <div class='checkcontainer' align='center'>
        <CheckOrder cart={this.props.cart}
          onRemoveItem={this.props.onRemoveItem}
          onUpdateItem={this.props.onUpdateItem}/>
        <CheckPayment
          visitor={this.props.visitor}
          pay={this.props.pay}
          onV={this.props.onV}
          onP={this.props.onP}
          user={this.props.user}/>
        <CheckPlaceOrder
          visitor={this.props.visitor}
          user={this.props.user}
          restInfo={this.props.restInfo}
          cart={this.props.cart}
          cooks={this.state.Cooks}/>
      </div>
    );
  }
}


export default CheckOut;
