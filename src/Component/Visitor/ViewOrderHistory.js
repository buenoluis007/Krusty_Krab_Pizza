import React, { Component } from 'react';

class OrderFoodList extends Component{
  render(){
    var food = this.props.food;
    var order = this.props.order;
    var rateb = null;
    if (order.status >= 2 && food.rated == 0){
      rateb = [
        <form action='/rateFood' method='post'>
          <input type='hidden' name='foodName' value={food.foodName}/>
          <input type='hidden' name='restID' value={order.restaurantID}/>
          <input type='hidden' name='orderID' value={food.orderID}/>
          <select name='rating'>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>
          &ensp;&ensp;
          <input className='ratebutton' type='submit' name='submit' value='Rate'/>
        </form>
      ];
    }
    return[
      <tr height='60px'>
        <td align='left' valign='top' width='350px'>
          <span>{food.foodName}</span>
        </td>
        <td align='left' valign='top' width='50px'>
          <span>{food.qty}</span>
        </td>
        <td align='right' valign='top'>
          {rateb}
        </td>
      </tr>
    ];
  }
}

class OrderContainer extends Component{
  render(){
    var foodarray = this.props.foods.filter((food)=>{ return (food.orderID===this.props.order.orderID);});
    var foodlist = foodarray.map((f)=>{ return <OrderFoodList food={f} order={this.props.order}/> });

    var order = this.props.order;
    var rateR = null;
    var rateD = null;
    console.log('ORDERID: '+order.orderID)
    if (order.status == 2){
      rateR = [
        <form action='/rateRestaurant' method='post'>
          <input type='hidden' name='restName' value={order.name}/>
          <input type='hidden' name='restID' value={order.restaurantID}/>
          <input type='hidden' name='orderID' value={order.orderID}/>
          <select name='rating'>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>
          &ensp;&ensp;
          <input className='ratebutton' type='submit' name='submit' value='Rate'/>
        </form>
      ];
    }

    if (order.status>=2 && order.drated==0){
      rateD = [
        <form action='/rateDelivery' method='post'>
          <input type='hidden' name='deliveryID' value={order.deliveryID}/>
          <input type='hidden' name='restID' value={order.restaurantID}/>
          <input type='hidden' name='orderID' value={order.orderID}/>
          <select name='rating'>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>
          &ensp;&ensp;
          <input className='ratebutton' type='submit' name='submit' value='Rate'/>
        </form>
      ];
    }

    return[
      <p></p>,
      <div className='viewcontainer'>
        <h2 align='left'>Order# {this.props.order.orderID}</h2>
          <table border='0' width='580px'>
            <tr>
              <td align='left' valign='top' height='40px'>
                <span><b>Restaurant:</b> {this.props.order.name} </span>
              </td>
              <td align='right' valign='top'>
                {rateR}
              </td>
            </tr>
            <tr>
              <td align='left' valign='top' height='40px'>
                <span><b>Delivery Person #</b> {this.props.order.deliveryID} </span>
              </td>
              <td align='right' valign='top'>
                {rateD}
              </td>
            </tr>
            <tr>
              <td align='left' width='340px'>
                <span><b>Date:</b> {this.props.order.orderDate} </span>
              </td>
              <td align='left'>
                <span><b>Total:</b> ${this.props.order.total} </span>
              </td>
            </tr>
          </table>
          <table border='0' width='580'>
            <tr height='40px'>
              <td align='left' valign='top' width='350px'>
                <span><b>Item</b><br/></span>
              </td>
              <td align='left' valign='top' width='50px'>
                <span><b>qty</b><br/></span>
              </td>
            </tr>
            { foodlist }
          </table>
        </div>
    ];
  }
}

class ViewOrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Orders: [],
            Foods: []
        };
    }

    componentDidMount() {
        fetch('/getOrderHistory')
            .then(res => res.json())
            .then(data => this.setState({ Orders: data }));
        fetch('/getFoodHistory')
            .then(res => res.json())
            .then(data => this.setState({ Foods: data }));
    }


    render() {
      let body = this.state.Orders.map((order, i) =>
        <OrderContainer order={order} foods={this.state.Foods}/>
      );

      return (
          <div>
            <div className='viewcontainer2'>
              <h2>Order History</h2>
            </div>
            {body}
          </div>
      );
    }
}

export default ViewOrderHistory;
