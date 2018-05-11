import React, { Component } from 'react';
import './Manager.css';

class Complaints extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Complaints: []
        };
    }

    componentDidMount() {
        fetch('/Complaints')
            .then(res => res.json())
            .then(complaint => this.setState({ Complaints: complaint }))
    }

    render() {
        console.log(this.state.Complaints);
        return (
            <div>
                <h1>Complaints</h1>
                <table className='manager'>
                    <thead className='header'>
                        <td>Name</td>
                        <td>Subject</td>
                        <td>Rating</td>
                        <td>Detail of Complaint</td>
                    </thead>
                    {this.state.Complaints.map((complaint, i) =>
                        <tr key={this.state.Complaints[i].userID}>
                            <td>{
                                this.state.Complaints[i].name}
                            </td>
                            <td>
                                {this.state.Complaints[i].subject}
                            </td>
                            <td>
                                {this.state.Complaints[i].rating}
                            </td>
                            <td>
                                {this.state.Complaints[i].complaint}
                            </td>
                            <td>
                                <form action='/removeComplaint' method='POST'>
                                    <button
                                        type="submit" name='complaintID'
                                        value ={this.state.Complaints[i].complaintID}
                                    >Remove
                                    </button>
                                </form>
                            </td>
                        </tr>
                    )}
                </table>
            </div>
        )
    }
}

export default Complaints;
