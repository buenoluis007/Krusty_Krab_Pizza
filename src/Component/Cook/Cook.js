import React, { Component } from 'react';
import './Cook.css'
class Cook extends Component{
    constructor(props) {
        super(props);
        this.state =
        {
          Menu: [],
          CurrentOrder: []
        };
      }
    componentDidMount() {
        fetch('/MenuCook/')
            .then(res => res.json())
            .then(menu => this.setState({ Menu: menu }));

        fetch('/OrdersCook/')
            .then(res => res.json())
            .then(Order => this.setState({ CurrentOrder: Order }));
     }

  render(){
      console.log(this.state.Menu);
    return(

      <div>
      <form className="Cook" action="/Account/Cook/AddFood" method="POST">
        <h1>Add a food item to the Menu </h1>
          <input type="text" name="foodName" placeholder="Food Name"/>
          <br/>
          <input type="text" name="foodDesc" placeholder="Food Description"/>
          <br/>
          <input type="text" name="foodPrice" placeholder="Price of Food"/>
          <br/>

          <button
            id="enter"
            type="submit"
            name="button"
            className="Cook">Add Food</button>
        </form>

        <form className="Cook" action= "/Account/Cook/RemoveFood" method="POST">
            <h1>Remove a food item from the Menu</h1>

            <input type="text" name="foodName_2" placeholder="Food Name"/>
            <br/>
            <button
              id="enter"
              type="submit"
              name="button"
              className="Cook">Remove Food</button>

        </form>

        {this.state.Menu.map((item,i) =>
            <div>{this.state.Menu[i].foodName}
                 {this.state.Menu[i].description}
                 {this.state.Menu[i].price}
                 {this.state.Menu[i].rating}
                 <h1> </h1></div>

        )}
        <br/>
        <br/>
        {this.state.CurrentOrder.map((item,i) =>

            <div>
                {this.state.CurrentOrder[i].orderID}
                {this.state.CurrentOrder[i].foodName}
                {this.state.CurrentOrder[i].qty}
                <h1> </h1>
            </div>

        )}




        </div>
    );
  }


}

export default Cook;
