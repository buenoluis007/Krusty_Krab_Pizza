import React, { Component } from 'react';
import './Cook.css'
class Cook extends Component{
    constructor(props) {
        super(props);
        this.state =
        {
          Menu: [],
          Status: 0
        };
      }
    componentDidMount() {
       fetch('/MenuCook/')
         .then(res => res.json())
         .then(menu => this.setState({ Menu: menu }));
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
            <div>{this.state.Menu[i].foodName}</div>

        )}





        </div>
    );
  }


}

export default Cook;
