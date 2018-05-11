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
import Menu from '../Menu/Menu';
import CheckOut from '../CheckOut/CheckOut';
import Cook from '../Cook/Cook';
import Visitor from '../Visitor/Visitor';
import Complain from '../Complain/Complain';
import ProcessOrder from '../ProcessOrder/ProcessOrder';

class Routes extends Component {
  constructor() {
      super();
      this.state =
      {
        Users : [],
        Cart : new cart(),
        Visitor: {}, //info from RegisteredAccts
        Pay: {},
        RestInfo: {},
        PrevRest: 0
      };

      this.handleAddItem = this.handleAddItem.bind(this);
      this.handleUpdateItem = this.handleUpdateItem.bind(this);
      this.handleRemoveItem = this.handleRemoveItem.bind(this);
      this.handleResInfo = this.handleResInfo.bind(this);
      this.handleClearCart = this.handleClearCart.bind(this);
      this.handleUpdateDiscount = this.handleUpdateDiscount.bind(this);
      this.handleVisitorChange = this.handleVisitorChange.bind(this);
      this.handlePayChange = this.handlePayChange.bind(this);
      this.handleSetPrev = this.handleSetPrev.bind(this);
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
      let savePrev =  JSON.parse(sessionStorage.getItem('savedPrev'));
      if (savePrev != null){
        this.setState({PrevRest: savePrev});
      }
      fetch('/user')
        .then(res => res.json())
        .then(user => this.setState({ Users: user }));
      fetch('/currRest')
        .then(res => res.json())
        .then(info => this.setState({ RestInfo: info }));
      fetch('/visitorInfo')
          .then(res => res.json())
          .then(info => this.setState({ Visitor: info }));
      fetch('/payInfo')
          .then(res => res.json())
          .then(info => this.setState({ Pay: info }));
    }

    componentDidUpdate(){
      sessionStorage.setItem('savedState', JSON.stringify(this.state.Cart.getItems()));
      sessionStorage.setItem('savedPrev', JSON.stringify(this.state.PrevRest));
    }

    handleSetPrev(currest){
      this.setState({ PrevRest: currest});
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

    handleClearCart(){
       let cart = this.state.Cart;
       cart.clearCart();
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

    handleVisitorChange(event){
      const t = event.target;
      const value = t.value;
      const name = t.name;
      this.setState({ Visitor: { [name]: value } });
    }

    handlePayChange(event){
      const t = event.target;
      const value = t.value;
      const name = t.name;
      this.setState({ Pay: { [name]: value } });
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
            <div className='navbar'>
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
            <div className='main'>

              <Route path="/" exact component={ Home } />
              <Route path="/Account" exact component={ Accounts } />
              <Route path="/Account/Manager" exact component={ Manager } />
              <Route path="/Account/Cook" exact component={ Cook } />
              <Route path="/Account/Visitor" render={(props) =>{return(
                  <Visitor
                    user={this.state.Users}
                    visitor={this.state.Visitor}
                    pay={this.state.Pay}
                    cart={this.state.Cart}
                    onP={this.handlePayChange}
                    onV={this.handleVisitorChange}/>)}} />
              <Route path="/register" exact component={ Register } />
              <Route path="/login" exact component={ LogIn } />
              <Route path="/SignOut" exact component={ SignOut } />
              <Route path="/complain" exact component={ Complain } />
              <Route path="/menu/:placeID" render={(props) =>{return(
                  <Menu
                    {...props}
                    user={this.state.Users}
                    cart={this.state.Cart}
                    prev={this.state.PrevRest}
                    onSetPrev={this.handleSetPrev}
                    onResInfo={this.handleResInfo}
                    onAddItem={this.handleAddItem}
                    onUpdateItem={this.handleUpdateItem}
                    onRemoveItem={this.handleRemoveItem}
                    onClearCart={this.handleClearCart}
                    onUpdateDiscount={this.handleUpdateDiscount}/>)}} />
              <Route path="/checkout" render={(props) =>{return(
                  <CheckOut
                    user={this.state.Users}
                    cart={this.state.Cart}
                    restInfo={this.state.RestInfo}
                    visitor={this.state.Visitor}
                    pay={this.state.Pay}
                    onP={this.handlePayChange}
                    onV={this.handleVisitorChange}
                    onUpdateItem={this.handleUpdateItem}
                    onRemoveItem={this.handleRemoveItem}/>)}} />
              <Route path="/processingorder" render={(props) =>{return(
                  <ProcessOrder
                    cart={this.state.Cart}
                    onClearCart={this.handleClearCart}/>)}} />
          </div>
        </div>
        );
    }
}
export default Routes;
