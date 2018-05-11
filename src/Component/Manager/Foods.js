import React, { Component } from 'react';

class FoodItem extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Foods: [],
        };
    }

    componentDidMount() {
        fetch('/getFoodItems')
            .then(res => res.json())
            .then(food => this.setState({ Foods: food }))
    }
    render(props) {
        return (
            <div>
                <form action='/getFoodItems' method='GET' value={this.props.id}>
                    <div>
                        {this.state.Foods.map((item, i) =>
                            <div>{this.state.Foods[i].foodName}</div>
                        )}
                    </div>
                </form>
            </div>
        )
    }
}

export default FoodItem;
