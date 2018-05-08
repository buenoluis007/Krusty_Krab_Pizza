import React, { Component } from 'react';

class DeliveryPerson extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            DeliveryPerson: [],
        }
    }

    componentDidMount() {
        fetch('/DeliveryPerson')
            .then(res => res.json())
            .then(info => this.setState({ DeliveryPerson: info }))
    }

    render(){
        console.log(this.state.DeliveryPerson[0]);
        return (
            <div>
                <h1>Delivery Staff Members:</h1>
                {this.state.DeliveryPerson.map((persin, i) =>
                    <div key={i}>
                        <div>{this.state.DeliveryPerson[i].name}
                            <span> Salary: {this.state.DeliveryPerson[i].salery}</span>
                        </div>
                    </div>
                )}
            </div>

        )
    }
}

export default DeliveryPerson;
