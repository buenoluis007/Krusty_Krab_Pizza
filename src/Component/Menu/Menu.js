import React, { Component } from 'react';
import './Menu.css'

class Menu extends Component {
  constructor() {
      super();
      this.state =
      {
        Users : [],
        Restaurant: [],
        Menu: []
      };
    }

    // fetch the user's info from express
    componentDidMount() {
      fetch('/users')
        .then(res => res.json())
        .then(user => this.setState({ Users: user }));
      fetch('/restaurantInfo')
        .then(info => this.setState({ Restaurant: info }));
      fetch('/menuInfo')
        .then(menu => this.setState({ Menu: menu }));
    }

    render() {
      // change the login state if the info inputted is wrong
      let heading = null;
      let menuItems = null;

      //this.state.Restaurant not fetching
      heading = (
        <div>
            <h1>{this.state.Restaurant.name}</h1>
            <p>{this.state.Restaurant.address}</p>
            <p>{this.state.Restaurant.phoneNum}</p>
          </div>
        );

      //Temporay. this.state.Menu not fetching.
      //suppose to fetch an array, if possible
      let Menu = [{foodName:'Pizza',price:12.00,description:"Regular Pie"},{foodName:'Chicken Roll',price:5.50,description:"fucking chicken"}];

      menuItems = Menu.map((items) =>
        <li> { items.foodName } ${ items.price } { items.description }
          <form target="shopcart" action="/addItem" method="POST">
            <input type="hidden" name="foodName" value={items.foodName}/>
            <input type="hidden" name="qty" value="1"/>
            <input type="hidden" name="price" value={items.price}/>
            <button type="submit" name="submit"> Add to Cart </button>
          </form>
        </li>
      );

      return (
        <div>
          { heading }
          <div id="menulist">
            <ul>
                { menuItems }
            </ul>
          </div>

          {/*will be linked to ShoppingCart*/}
          <iframe name="shopcart"></iframe>

        </div>
      )
    }
}

export default Menu;
