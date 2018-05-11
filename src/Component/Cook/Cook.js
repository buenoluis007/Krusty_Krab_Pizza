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

      <div className='dddd'>
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
        <form className="Cook" action= "/Account/Cook/FoodDone" method="POST">
            <h1>Done Cooking the Food</h1>

            <input type="text" name="FoodOrderID" placeholder="Order ID"/>
            <br/>
            <button
              id="enter"
              type="submit"
              name="button"
              className="Cook">Food is Completed</button>

        </form>
        <h2 className="cookh3"> Menu </h2>

            <div className='menuDiv'>
                <table className='menuTable'>
                    <thead>
                        <th>Food Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Rating</th>
                    </thead>
                    {this.state.Menu.map((item,i) =>
                    <tbody>
                        <tr>
                            <td>{this.state.Menu[i].foodName}</td>
                            <td>{this.state.Menu[i].description}</td>
                            <td>${this.state.Menu[i].price}</td>
                            <td>{this.state.Menu[i].rating}</td>

                        </tr>
                    </tbody>
                    )}
                </table>

                 <h1> </h1></div>



        <br/>
        <br/>
        <h2 className="cookh3"> Current Orders </h2>

            <div>
            <table className='menuTable'>
                <thead>
                    <th>orderID</th>
                    <th>foodName</th>
                    <th>Quantity</th>
                </thead>
                {this.state.CurrentOrder.map((item,i) =>
                <tbody>
                    <tr>
                        <td>{this.state.CurrentOrder[i].orderID}</td>
                        <td>{this.state.CurrentOrder[i].foodName}</td>
                        <td>{this.state.CurrentOrder[i].qty}</td>
                    </tr>
                </tbody>
                )}
            </table>

            </div>






        </div>
    );
  }


}

export default Cook;
