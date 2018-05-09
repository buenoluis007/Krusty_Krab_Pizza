import React, { Component } from 'react';
import './Cook.css'
class Cook extends Component{
    // constructor() {
    //     super();
    //     this.state =
    //     {
    //       Users : []
    //     };
    //   }
    //
    //
    // // fetch the user's info from express
    // componentDidMount() {
    //   fetch('/Account/Cook')
    //     .then(res => res.json())
    //     .then(user => this.setState({ Users: user }))
    // }

  render(){
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
        </div>
    );
  }
}

export default Cook;
