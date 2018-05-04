import React, { Component } from 'react';
import './Menu.css'

var restID = '?id=1'

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
    componentDidMount(props) {
      fetch('/users')
        .then(res => res.json())
        .then(user => this.setState({ Users: user }));
      fetch('/restaurantInfo' + restID)
        .then(res => res.json())
        .then(info => this.setState({ Restaurant: info }));
      fetch('/menuInfo' + restID)
        .then(res => res.json())
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

      menuItems = this.state.Menu.map((items) =>
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
          <iframe name="shopcart" src=""></iframe>
          <ShoppingCart/>
        </div>
      )
    }
}

class ShoppingCart extends Component {
  constructor() {
      super();
      this.state =
      {
        Restaurant: [],
        Totals: [],
        Items: []
      };
    }

    componentDidMount() {
      fetch('/restaurantInfo?id=1')
        .then(res => res.json())
        .then(info => this.setState({ Restaurant: info }));
      fetch('/receipt')
        .then(res => res.json())
        .then(info => this.setState({ Totals: info }));
      fetch('/shoppingCart')
        .then(res => res.json())
        .then(info => this.setState({ Items: info }));
    }

    render() {

      let heading = null;
      let body = null;
      let totals = null;

      heading = (
        <div>
          <center>
            <p>{this.state.Restaurant.name}</p>
            <p>{this.state.Restaurant.address}</p>
            <p>{this.state.Restaurant.phoneNum}</p>
          </center>
        </div>
      );

      body = this.state.Items.map((item) =>
        <tr>
          <td width="50%">{ item.foodName }</td>
          <td width="20%">{ item.qty }</td>
          <td width="30%">${ item.price }</td>
        </tr>
      );

      totals = [
        <tr>
          <td colspan="2"> Discount({this.state.Totals.discountpct*100}%): </td>
          <td> ${this.state.Totals.discount} </td>
        </tr>,
        <tr>
          <td colspan="2"> Subtotal: </td>
          <td>${this.state.Totals.subtotal}</td>
        </tr>,
        <tr>
          <td colspan="2">Tax({this.state.Totals.taxpct*100}%):</td>
          <td>${this.state.Totals.tax}</td>
        </tr>,
        <tr>
          <td colspan="2">Total:</td>
          <td>${this.state.Totals.total}</td>
        </tr>
      ];

      return (
        <div>
          { heading }
          <div id="items" align="center">
            <table border="1" width="50%" bgcolor="white">
                { body }
                { totals }
            </table>
          </div>
        </div>
      )
    }
}

export default Menu;
