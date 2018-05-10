import React, { PureComponent } from 'react';
import Cooks from './ManageCooks';
import DeliveryPerson from './ManageDeliveryPerson';
import Pending from './PendingApps';
import Complaints from './Complaints';
import Orders from './ReadyOrders';

import './Manager.css';

class Manager extends PureComponent {
    constructor(props) {
        super(props);
        this.state =
        {
            Manager: []
        };
    }

    componentDidMount() {
        fetch('/Account/Manager')
            .then(res => res.json())
            .then(info => this.setState({ Manager: info }))
    }


    render() {
        console.log(this.state.Manager);
        return (
            <div>
                <h1>{this.state.Manager.resName}</h1>
                < Cooks />
                < DeliveryPerson />
                < Pending />
                < Complaints />
                < Orders />
            </div>
        )
    }
}

export default Manager;
