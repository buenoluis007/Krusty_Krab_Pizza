import React, { PureComponent } from 'react';
import Cooks from './Cooks';

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
        // this.state.Restaurant.cooks.map((user) => {
        //     <li>user.name</li>
        //                     })
        //console.log('Restaurant state: ');
        //console.log(this.state.Restaurant);
        //console.log(this.state.Restaurant[0].name);
        //console.log(this.state.Restaurant.pendingUsers);
        console.log(this.state.Manager);
        // const name = this.state.Restaurant.cooks.map((cook, i) =>{
        //     return (<div key={i}>{this.state.Restaurant[i].name}</div>)}
        // )

        // const name = this.state.Restaurant.keys(cooks).map(function(key, index) {
        //     return (<div>{cooks[key]}</div>)
        // });
        return (
            <div>
                <h1>{this.state.Manager.name}</h1>
                <Cooks/>

            </div>
        )
    }
}

export default Manager;
