import React, { Component } from 'react';

import Manager from '../Manager/Manager';
import Cook from '../Cook/Cook';
import Visitor from '../Visitor/Visitor';
import Delivery from '../Delivery/Delivery';

class Accounts extends Component {
    constructor() {
        super();
        this.state =
        {
            Users : []
        };
    }

    componentDidMount() {
      fetch('/user')
        .then(res => res.json())
        .then(user => this.setState({ Users: user }))
    }

    render() {
        let display = null;
        if(this.state.Users.type === 'Manager'){
            this.props.history.push('/Account/Manager')
                display = (
                    <div>
                        < Manager />
                    </div>
                )
        }
        if(this.state.Users.type === 'Cook'){
            this.props.history.push('/Account/Cook')
                display = (
                    <div>
                        < Cook />
                    </div>
                )
        }
        if(this.state.Users.type === 'Delivery'){
            this.props.history.push('/Account/Delivery')
                display = (
                    <div>
                        < Delivery />
                    </div>
                )
        }
        if(this.state.Users.type === 'Visitor' || this.state.Users.type === 'Registered'){
            this.props.history.push('/Account/Visitor')
        }
        return (
            <div>
                <h1>Your Email: {this.state.Users.email}</h1>
                <h1>Account Type: {this.state.Users.type}</h1>
                {display}
            </div>
        );
    }
}

export default Accounts
