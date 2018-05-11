import React, { Component } from 'react';
import Direction from '../Map/Direction';
import './Delivery.css';

class DeliveryForm extends Component{
  render(){
    var rateform = <td></td>;
    if(this.props.order.urated==0){
      rateform=[
          <td><form action='/rateUser' method='POST'>
            <input type='hidden'
             name='restID'
             value={this.props.order.restaurantID} />
             <input type='hidden'
              name='userID'
              value={this.props.order.userID} />
              <input type='hidden'
               name='orderID'
               value={this.props.order.orderID} />
            <select name='rating'> Rating
                <option value='5'>5</option>
                <option value='4'>4</option>
                <option value='3'>3</option>
                <option value='2'>2</option>
                <option value='1'>1</option>
            </select>
            <input type='submit' value='Rate' />
        </form></td>
      ];
    }

    return[
      <form action='/CompletedDelivery' method='POST'>
          <table className='delTable'>
                  <thead>
                      <th>Order#</th>
                      <th>Address</th>
                      <th>Subtotal</th>
                      <th>Tax</th>
                      <th>Total</th>
                      <th>Rate The Customer</th>
                      <th>Complete Order</th>
                  </thead>

                      <tbody>
                          <tr>
                              <td>{this.props.order.orderID}</td>
                              <td>{this.props.order.address}</td>
                              <td>${this.props.order.subtotal}</td>
                              <td>${this.props.order.tax}</td>
                              <td>${this.props.order.total}</td>
                              {rateform}
                              <td><button type='submit' name='done' value={this.props.order.orderID}>Delivered</button></td>
                          </tr>
                      </tbody>

              </table>
              <div id='google'>
                  < Direction origin='' address={this.props.order.address} originLat={this.props.order.latitude} originLng={this.props.order.longitude}/>
              </div>
          </form>
    ];
  }
}

class Delivery extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Delivery: []
        };
    }

    componentDidMount() {
        fetch('/gettingOrder')
            .then(res => res.json())
            .then(delivery => this.setState({ Delivery: delivery }))
    }

    render() {
        console.log(this.state.Delivery);

        return (
            <div>
                <h1 className='delh1'>Orders</h1>
                {this.state.Delivery.map((order, i) => <DeliveryForm order={order}/>)}

            </div>
        )
    }
}

export default Delivery;
