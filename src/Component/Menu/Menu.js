import React, { Component } from 'react';
import './Menu.css'
import ShoppingCart from '../ShoppingCart/ShoppingCart'

var restID = '?id=1'

class MenuHeading extends Component{
  render(){
    return(
      <div class='menuheading'>
        <p><h1>{this.props.Restaurant.name}</h1>
        {this.props.Restaurant.address}<br/>
        {this.props.Restaurant.phoneNum}</p>
      </div>
    );
  }
}

class MenuItem extends Component{
  render(){
    const item = this.props.item
    return(
      <div class='item'>
        <div class='item-left'>
          <span style={{fontSize:18, fontWeight:'bold'}}>
            { item.foodName }<br/></span>
          <span style={{fontSize:14, color:'rgba(80,80,80)'}}>
            { item.description }</span>
        </div>
        <div class='item-right'>
        ${ item.price.toFixed(2) }

            <button style={{bottom:5,left:0,position:'absolute'}}
              onClick={()=>this.props.onAddItem({
                foodName:item.foodName,
                qty:1,
                price:item.price})}>Add to Cart</button>

        </div>
      </div>
    );
  }
}

class Menu extends Component {
  constructor(props) {
      super(props);
      this.state =
      {
        Restaurant: [],
        Menu: [],
        Status: 2
      };
    }

    componentDidMount() {
      //restID = this.props.match.params;
      fetch('/restaurantInfo' + restID)
        .then(res => res.json())
        .then(info => this.setState({ Restaurant: info }));
      fetch('/menuInfo' + restID)
        .then(res => res.json())
        .then(menu => this.setState({ Menu: menu }));
      if (this.state.Status === 1)
        this.props.onUpdateDiscount(.05);
      else if (this.state.Status === 2)
        this.props.onUpdateDiscount(.1);


    }

    render() {
      let menuItems = null;

      menuItems = this.state.Menu.map((item) =>
        <MenuItem item={item} onAddItem={this.props.onAddItem}/>
      );

      return [
        <div class='leftpanel'>
          <div class="menulist">
              <MenuHeading Restaurant={this.state.Restaurant}/>
              { menuItems }
          </div>
        </div>,
        <div class='rightpanel'>
          <ShoppingCart cart={this.props.cart}
            onRemoveItem={this.props.onRemoveItem}
            onUpdateItem={this.props.onUpdateItem}/>
        </div>
      ]
    }
}



export default Menu;
