import React, { Component } from 'react';
import Direction from '../Map/Direction';
import './Delivery.css';

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
                {this.state.Delivery.map((order, i) =>
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
                                            <td>{this.state.Delivery[i].orderID}</td>
                                            <td>{this.state.Delivery[i].address}</td>
                                            <td>${this.state.Delivery[i].subtotal}</td>
                                            <td>${this.state.Delivery[i].tax}</td>
                                            <td>${this.state.Delivery[i].total}</td>
                                            <td><form action='/rateUser' method='POST'>
                                                <input type='hidden'
                                                 name='restID'
                                                 value={this.state.Delivery[i].restaurantID} />
                                                 <input type='hidden'
                                                  name='userID'
                                                  value={this.state.Delivery[i].userID} />
                                                <select name='rating'> Rating
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                                <input type='submit' value='Rate' />
                                            </form></td>
                                            <td><button type='submit' name='done' value={this.state.Delivery[i].orderID}>Delivered</button></td>
                                        </tr>
                                    </tbody>

                            </table>
                            <div id='google'>
                                < Direction origin='' address={this.state.Delivery[i].address} originLat={this.state.Delivery[i].latitude} originLng={this.state.Delivery[i].longitude}/>
                            </div>
                        </form>
                    )}

            </div>
        )
    }
}

export default Delivery;
