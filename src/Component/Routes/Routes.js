import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import cart from '../../cart2'
import './Routes.css';

import Register from '../Register/Register';
import LogIn from '../LogIn/LogIn';
import SignOut from '../SignOut/SignOut';
import Home from '../Home/Home';
import Accounts from '../Accounts/Accounts';
import Manager from '../Manager/Manager';
import Restaurant from '../Restaurant/Restaurant';
import Cooks from '../Manager/Cooks'
import Menu from '../Menu/Menu';
import CheckOut from '../CheckOut/CheckOut';


class Routes extends Component {
  constructor() {
      super();
      this.state =
      {
        Users : [],
        Cart : new cart(),
        RestInfo: {}
      };

      this.handleAddItem = this.handleAddItem.bind(this);
      this.handleUpdateItem = this.handleUpdateItem.bind(this);
      this.handleRemoveItem = this.handleRemoveItem.bind(this);
      this.handleResInfo = this.handleResInfo.bind(this);
      this.handleUpdateDiscount = this.handleUpdateDiscount.bind(this);
    }

    // fetch the user's info from express
    componentDidMount() {
      let savedItems = JSON.parse(sessionStorage.getItem('savedState'));
      if (savedItems != null){
        let savedCart = this.state.Cart;
        savedCart.setItems(savedItems);
        savedCart.updatePrice();
        this.setState({Cart: savedCart});
      }
      fetch('/user')
        .then(res => res.json())
        .then(user => this.setState({ Users: user }));
      fetch('/currRest')
        .then(res => res.json())
        .then(info => this.setState({ RestInfo: info }));
    }

    componentDidUpdate(){
      sessionStorage.setItem('savedState', JSON.stringify(this.state.Cart.getItems()));
    }

    handleAddItem(item){
       let cart = this.state.Cart;
       cart.addItem(item.foodName,item.qty,item.price);
       cart.updatePrice();
       this.setState({Cart:cart});
    }

    handleUpdateItem(index,qty){
       let cart = this.state.Cart;
       cart.updateQty(index,qty);
       cart.updatePrice();
       this.setState({Cart:cart});
    }

    handleRemoveItem(index){
       let cart = this.state.Cart;
       cart.removeItem(index);
       cart.updatePrice();
       this.setState({Cart:cart});
    }

    handleResInfo(restaurant){
      console.log(restaurant);
      let cart = this.state.Cart;
      cart.setRestaurant(restaurant)
      this.setState({Cart: cart});
    }

    handleUpdateDiscount(pct){
      let cart = this.state.Cart;
      cart.setDiscountPct(pct);
      cart.updatePrice();
      this.setState({Cart: cart});
    }

    render () {
      // check if the user is logged in using the info provided by express
      let loggedIn = false;
      if(this.state.Users.loggedIn === true){
        loggedIn = true
      }

      // adjust the link accordingly to the log in status of the user
      let status = null;
      let registerable = null;
      let accountInfo = null;
      if(loggedIn === false) {
          status = (
              <li><Link to="/login">Log In</Link></li>
          )
          registerable = (
              <li><Link to="/register">Register</Link></li>
          )
      } else {
            status = (
                <li><Link to="/signout">Sign Out</Link></li>
        )
            if(this.state.Users.type === 'Manager'){
                accountInfo = (
                    <li><Link to="/Account/Manager">Account</Link></li>
                )
            } else {
                accountInfo = (
                    <li><Link to="/Account">Account</Link></li>
                )
            }
        }


        return (
          <div>
            <div class='navbar'>
              <header className='Routes'>
                    <nav>
                      <ul>
                          { registerable }
                          { status }
                          { accountInfo }
                          <li><Link to="/">Home</Link></li>
                      </ul>
                  </nav>
              </header>
            </div>
            <div class='main'>

              <Route path="/" exact component={ Home } />
              <Route path="/Account" exact component={ Accounts } />
              <Route path="/Account/Manager" exact component={ Manager } />
              <Route path="/register" exact component={ Register } />
              <Route path="/login" exact component={ LogIn } />
              <Route path="/SignOut" exact component={ SignOut } />
              <Route path="/restaurant/:resName" exact component={ Restaurant }/>
              <Route path="/restaurant/:resID" exact component={ Restaurant }/>
              <Route path="/menu/:resID" render={(props) =>{return(
                  <Menu
                    {...props}
                    user={this.state.Users}
                    cart={this.state.Cart}
                    onResInfo={this.handleResInfo}
                    onAddItem={this.handleAddItem}
                    onUpdateItem={this.handleUpdateItem}
                    onRemoveItem={this.handleRemoveItem}
                    onUpdateDiscount={this.handleUpdateDiscount}/>)}} />
              <Route path="/checkout" render={(props) =>{return(
                  <CheckOut
                    user={this.state.Users}
                    cart={this.state.Cart}
                    restInfo={this.state.RestInfo}
                    onUpdateItem={this.handleUpdateItem}
                    onRemoveItem={this.handleRemoveItem}/>)}} />
          </div>
        </div>
        );
    }
}
export default Routes;
