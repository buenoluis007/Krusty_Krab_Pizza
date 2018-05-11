import React, { Component } from 'react';
import './Manager.css';

class Cooks extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Cook: [],
        };
    }

    componentDidMount() {
        fetch('/Cooks')
            .then(res => res.json())
            .then(info => this.setState({ Cook: info }))
    }


    // {this.state.Cook.map((cook,i) =>
    //     <div key={i}>
    //         <div>{this.state.Cook[i].name}
    //             <span> Salary: {this.state.Cook[i].salery}</span>
    //         </div>
    //     </div>
    // )}
    render(){
        console.log(this.state.Cook[0]);
        return (
            <div className='cookDiv'>
                <h1>Cooks Staff Members:</h1>
                <table className='manager'>
                    <thead className='header'>
                        <td>Name</td>
                        <td>Salary</td>
                        <td>Strikes</td>
                        <td>Action</td>
                    </thead>
                    {this.state.Cook.map((cook,i) =>
                        <tbody key={this.state.Cook[i].userID}>
                            <tr>
                                <td>{this.state.Cook[i].name}</td>
                                <td>
                                    <form action='/manager/changeWage' method='POST'>
                                        <ul>
                                            <li><input type="text" name="salary" placeholder={this.state.Cook[i].salery}></input></li>
                                            <li><button type="submit" name="workerID" value={this.state.Cook[i].userID}
                                                className='update'>Update Wage</button></li>
                                        </ul>

                                    </form>

                                </td>
                                <td>{this.state.Cook[i].strikes}</td>
                                <td>
                                    <form action='/manager/fire' method='POST'>
                                        <button
                                            type="submit" name='fire'
                                            value ={this.state.Cook[i].userID}
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

export default Cooks;
