import React, { Component } from 'react';
import FoodItem from './Foods';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Orders: [],
            DeliveryPerson: [],
        };
    }

    componentDidMount() {
        fetch('/getOrdersID')
            .then(res => res.json())
            .then(order => this.setState({ Orders: order }))

        fetch('/DeliveryPerson')
            .then(res => res.json())
            .then(person => this.setState({ DeliveryPerson: person }))
    }

    render() {
        console.log(this.state.Orders);
        console.log(this.state.DeliveryPerson);
        return (
            <div>
                <h1>Current Orders</h1>
                <table>
                    <thead>
                        <td>Order Number</td>
                        <td>Address</td>
                        <td>Subtotal</td>
                        <td>Tax</td>
                        <td>Total</td>
                        <td>Appoint Delivery Person</td>
                    </thead>
                {this.state.Orders.map((order, i) =>
                    <form action='/AppointDelivery' method='POST'>
                        <tr>
                            <td>Order Number: {this.state.Orders[i].orderID}</td>
                            <td>Address: {this.state.Orders[i].address}</td>
                            <td>Subtotal: {this.state.Orders[i].subtotal}</td>
                            <td>Tax: {this.state.Orders[i].tax}</td>
                            <td>Total: {this.state.Orders[i].total}</td>
                            <select name='person'>
                                {this.state.DeliveryPerson.map((person, i) =>
                                    <option value={this.state.DeliveryPerson[i].userID}>
                                        {this.state.DeliveryPerson[i].name}
                                    </option>
                                )}
                            </select>
                            <button type='submit' name='orderID' value={this.state.Orders[i].orderID}>Assign</button>
                        </tr>
                    </form>
                )}
                </table>
            </div>
        )
    }
}

export default Orders;
