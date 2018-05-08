import React, { Component } from 'react';

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

    render(){
        console.log(this.state.Cook[0]);
        return (
            <div>
                <h1>Cooks Staff Members:</h1>
                {this.state.Cook.map((cook,i) =>
                    <div key={i}>
                        <div>{this.state.Cook[i].name}
                            <span> Salary: {this.state.Cook[i].salery}</span>
                        </div>
                    </div>
                )}
            </div>

        )
    }
}

export default Cooks;
