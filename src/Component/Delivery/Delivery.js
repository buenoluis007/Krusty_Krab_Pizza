import React, { Component } from 'react';
import Direction from '../Map/Direction';

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
                {this.state.Delivery.map((order, i) =>
                    <table>
                            <tr>
                                <td>Order #</td>
                                <td>Address</td>
                                <td>Subtotal</td>
                                <td>Tax</td>
                                <td>Total</td>
                            </tr>
                            <div>
                                <tr>
                                    <td>{this.state.Delivery[i].orderID}</td>
                                    <td>{this.state.Delivery[i].address}</td>
                                    <td>{this.state.Delivery[i].subtotal}</td>
                                    <td>{this.state.Delivery[i].tax}</td>
                                    <td>{this.state.Delivery[i].total}</td>
                                </tr>
                            </div>
                            <div>
                            < Direction origin='' address={this.state.Delivery[i].address} originLat={this.state.Delivery[i].latitude} originLng={this.state.Delivery[i].longitude}/>
                            </div>
                        </table>
                    )}

            </div>
        )
    }
}

export default Delivery;
