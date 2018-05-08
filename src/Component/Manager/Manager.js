import React, { PureComponent } from 'react';
import Cooks from './Cooks';
import DeliveryPerson from './DeliveryPerson';

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
            </div>
        )
    }
}

export default Manager;
