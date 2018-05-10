import React, { Component } from 'react';
import './Menu.css'
import ShoppingCart from '../ShoppingCart/ShoppingCart'

class MenuHeading extends Component{
  render(){
    let memberstatus = null;

    switch(this.props.status){
      case 1:
        memberstatus = [
         <form name='apply' action='/apply' method='post'>
           <input type='hidden' name='userID' value={this.props.user.userID}/>
           <input type='hidden' name='restID' value={this.props.Restaurant.restaurantID}/>
           <input type='submit' className='applybutton' value='Apply for Membership'/>
         </form>];
        break;
      case 2:
        memberstatus = (
          <div>
            Status: Member
          </div>);
        break;
      case 3:
        memberstatus = (
          <div>
            Status: VIP
          </div>);
        break;
      case 4:
        memberstatus = (
          <div>
            Status: Application Pending
          </div>);
        break;
      default:
        memberstatus = (<div></div>);
    }

    return(
      <div className='menuheading'>
        <table border='0' width='100%'>
          <tr>
            <td>
              <span><h1>{this.props.Restaurant.name}</h1>
              {this.props.Restaurant.address}<br/>
              {this.props.Restaurant.phoneNum}</span>
            </td>
            <td align='right' valign='top'>
              {memberstatus}
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class MenuItem extends Component{
  render(){
    const item = this.props.item
    return(
      <div className='item'>
        <div className='item-left'>
          <span style={{fontSize:18, fontWeight:'bold'}}>
            { item.foodName }<br/></span>
          <span style={{fontSize:14, color:'rgba(80,80,80)'}}>
            { item.description }</span>
        </div>
        <div className='item-right'>
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
        Status: 0
      };
    }

  componentDidMount() {
    let placeID = this.props.match.params.placeID;
    fetch('/restaurantInfo/' + placeID)
      .then(res => res.json())
      .then(info => {
        this.setState({ Restaurant: info });
        this.props.onResInfo(this.state.Restaurant);
        console.log('PREVSTATE: '+this.props.prev);
        if (this.props.prev !== this.state.Restaurant.restaurantID){
          this.props.onClearCart();
          this.props.onSetPrev(this.state.Restaurant.restaurantID);
        }
        fetch('/memberStatus')
          .then(res => res.json())
          .then(state=>{
            this.setState({Status: parseInt(state)});
            if (this.state.Status === 2)
              this.props.onUpdateDiscount(.05);
            else if (this.state.Status === 3)
              this.props.onUpdateDiscount(.1);
          });
      });

    fetch('/menuInfo/' + placeID)
      .then(res => res.json())
      .then(menu => this.setState({ Menu: menu }));
  }

  render() {
    console.log(this.state.Menu);
    let menuItems = null;

    menuItems = this.state.Menu.map((item) =>
      <MenuItem item={item} onAddItem={this.props.onAddItem}/>
    );

    return [
      <table border='0' align='center'>
        <tr>
          <td valign='top'>
            <div className='container leftpanel'>
              <div className="menulist">
                  <MenuHeading
                    Restaurant={this.state.Restaurant}
                    user={this.props.user}
                    status={this.state.Status}/>
                  { menuItems }
              </div>
            </div>,
          </td>
          <td valign='top'>
            <div className='container rightpanel'>
              <ShoppingCart
                cart={this.props.cart}
                onRemoveItem={this.props.onRemoveItem}
                onUpdateItem={this.props.onUpdateItem}/>
            </div>
          </td>
        </tr>
      </table>
    ]
  }
}



export default Menu;
