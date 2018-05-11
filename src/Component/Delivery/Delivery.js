import React, { Component } from 'react';
import Direction from '../Map/Direction';

class Delivery extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Delivery: [],
            resAddress: []
        };
    }

    componentDidMount() {
        fetch('/getOrder')
            .then(res => res.json())
            .then(delivery => this.setState({ Delivery: delivery }))
    }

    render() {
        console.log(this.state.Delivery);
        return (
            <div>
                <table>
                    <tr>
                        <td>Order #</td>
                        <td>Address</td>
                        <td>Subtotal</td>
                        <td>Tax</td>
                        <td>Total</td>
                    </tr>
                    {this.state.Delivery.map((order, i) =>
                        <div>
                        <tr>
                            <td>{this.state.Delivery[i].orderID}</td>
                            <td>{this.state.Delivery[i].address}</td>
                            <td>{this.state.Delivery[i].subtotal}</td>
                            <td>{this.state.Delivery[i].tax}</td>
                            <td>{this.state.Delivery[i].total}</td>
                        </tr>
                        < Direction origin='' address={this.state.Delivery[i].address} originLat={this.state.Delivery[i].latitude} originLng={this.state.Delivery[i].longitude}/>
                        </div>
                    )}
                </table>

            </div>
        )
    }
}

export default Delivery;
