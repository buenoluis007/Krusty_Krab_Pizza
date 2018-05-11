import React, { Component } from 'react';
import './Manager.css';

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

    // <h1>Delivery Staff Members:</h1>
    // {this.state.DeliveryPerson.map((persin, i) =>
    //     <div key={i}>
    //         <div>{this.state.DeliveryPerson[i].name}
    //             <span> Salary: {this.state.DeliveryPerson[i].salery}</span>
    //         </div>
    //     </div>
    // )}

    render(){
        console.log(this.state.DeliveryPerson);
        return (
            <div>
                <h1 id="deliveryHeader">Delivery Staff Members:</h1>
                <table className='manager'>
                    <thead className='header'>
                        <td>Name</td>
                        <td>Salary</td>
                        <td>Rating</td>
                        <td>Action</td>
                    </thead>
                    {this.state.DeliveryPerson.map((person, i) =>
                            <tbody key={this.state.DeliveryPerson[i].userID}>
                                <tr>
                                    <td>{this.state.DeliveryPerson[i].name}</td>
                                    <td>
                                    <form action='/manager/changeWage' method='POST'>
                                        <ul>
                                            <li><input type="text" name="salary" placeholder={this.state.DeliveryPerson[i].salery}></input></li>
                                            <li><button type="submit" name="workerID" value={this.state.DeliveryPerson[i].userID}
                                                className='update'>Update Wage</button></li>
                                        </ul>
                                    </form>
                                    </td>
                                    <td>{this.state.DeliveryPerson[i].rating}</td>
                                    <td>
                                        <form action='/manager/fire' method='POST'>
                                            <button
                                                type="submit" name='fire'
                                                value ={this.state.DeliveryPerson[i].userID}
                                                className='fire'
                                            >Fire
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>


                    )}
                </table>
            </div>

        )
    }
}

export default DeliveryPerson;
