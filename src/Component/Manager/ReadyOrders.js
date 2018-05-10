import React, { Component } from 'react';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Orders: []
        };
    }

    componentDidMount() {
        fetch('/Orders')
            .then(res => res.json())
            .then(order => this.setState({ Orders: order }))
    }

    render() {
        console.log(this.state.Orders);
        return (
            <div>
                <h1>Current Orders</h1>
                {this.state.Orders.map((order, i) =>
                    <div key='i'>{this.state.Orders[i].foodName}</div>
                )}
            </div>
        )
    }
}

export default Orders;
