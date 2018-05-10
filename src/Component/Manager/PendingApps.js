import React, { Component } from 'react';

class Pending extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Apps: [],
        };
    }

    componentDidMount() {
        fetch('/pendingUsers')
            .then(res => res.json())
            .then(app => this.setState({ Apps: app }))
    }

    render() {
        console.log(this.state.Apps);
        return(
            <div>
                <h1>Pending Users</h1>
                <table className='manager'>
                    <thead>
                        <td>Name</td>
                        <td>Action</td>
                    </thead>
                    {this.state.Apps.map((app, i) =>
                        <tbody key={this.state.Apps[i].userID}>
                            <tr>
                                <td>
                                    {this.state.Apps[i].name}
                                </td>
                                <td>
                                    <form action='/Manager/changeUserStatus' method='POST'>
                                        <select name='choice'>
                                            <option
                                                value='accept'>Accept
                                            </option>
                                            <option
                                                value='decline'>Decline
                                            </option>
                                        </select>
                                        <button
                                            type='submit'
                                            name='userID' value={this.state.Apps[i].userID}>
                                        Submit</button>
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

export default Pending;
