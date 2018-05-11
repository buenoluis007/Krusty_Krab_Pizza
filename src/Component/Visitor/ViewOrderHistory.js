import React, { Component } from 'react';

class ViewOrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Data: [],
            Orders: [],
        };
    }

    componentDidMount() {
        fetch('/Account/ViewOrderHistory')
            .then(res => res.json())
            .then(data => this.setState({ Data: data }));
    }


    render() {
        console.log(this.state.Data);
        return (
            <div>
            {this.state.Data.map((order, i) =>
                <div class='viewcontainer'>
                <form class="" action="/Account/RateDeliveryPerson" method="POST">
                    <table>
                        <th>{this.state.Data[i].name}</th>
                        <th>
                            <select name="rating">
                                <option selected>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>
                            </select>
                        </th>
                        <th> <button type="submit" name="CHANGE">Rate</button> </th>
                        <table>
                            <thead>
                                <th>OrderID: {this.state.Data[i].orderID}</th>
                                <th>Date: {this.state.Data[i].orderDate}</th>
                                <th>Total: {this.state.Data[i].total}</th>
                            </thead>
                        </table>
                    </table>
                </form>
                <form action="/Account/RateDeliveryPerson" method="POST">
                           <table>
                               <thead>
                                   <th>DeliveryPersonID: {this.state.Data[i].deliveryID}</th>
                                   <th>
                                       <select name="rating">
                                           <option selected>5</option>
                                           <option>4</option>
                                           <option>3</option>
                                           <option>2</option>
                                           <option>1</option>
                                       </select>
                                   </th>
                                   <th> <button type="submit" name="CHANGE">Rate</button> </th>
                               </thead>
                           </table>
                       </form>
                       <form class="" action="/Account/RateFood" method="POST">
                                   <table>
                                       <thead>
                                           <th>Food Ordered</th>
                                           <th>Qty</th>
                                           <th>Price</th>
                                           <th>Rating</th>
                                       </thead>
                                       <tbody>
                                           <tr>
                                               <td>Peperoni Pizza</td>
                                               <td>$10.00</td>
                                               <td>1</td>
                                               <td>
                                                   <div>
                                                       <select name="rating">
                                                           <option>1</option>
                                                           <option>2</option>
                                                           <option>3</option>
                                                           <option>4</option>
                                                           <option selected>5</option>
                                                       </select>
                                                   </div>
                                               </td>
                                               <td><button type="submit" name="CHANGE">Rate</button></td>
                                           </tr>
                                       </tbody>
                                   </table>
                               </form>
                    </div>
            )}
            </div>
        );
    }
}

export default ViewOrderHistory;


// {this.state.Data.map((order, i) =>
//     <form class="" action="/Account/RateDeliveryPerson" method="POST">
//         <table>
//             <th>{this.state.Data[i].name}</th>
//             <th>
//                 <select name="rating">
//                     <option selected>5</option>
//                     <option>4</option>
//                     <option>3</option>
//                     <option>2</option>
//                     <option>1</option>
//                 </select>
//             </th>
//             <th> <button type="submit" name="CHANGE">Rate</button> </th>
//             <table>
//                 <thead>
//                     <th>OrderID: {this.state.Data[i].orderID}</th>
//                     <th>Date: {this.state.Data[i].orderDate}</th>
//                     <th>Total: {this.state.Data[i].total}</th>
//                 </thead>
//             </table>
//         </table>
//     </form>
// )}

// <div class='viewcontainer'>
//     <div>
//         <form class="resHeadForm" action="/Account/RateRestaurant" method="POST">
//         {this.state.Data.map((item, i) =>
//             <table>
//                 <thead>
//                         <tr>
//                         <th>{this.state.Data[i].name}</th>
//                     <th>
//                         <select name="rating">
//                             <option selected>5</option>
//                             <option>4</option>
//                             <option>3</option>
//                             <option>2</option>
//                             <option>1</option>
//                         </select>
//                     </th>
//                     <th> <button type="submit" name="CHANGE">Rate</button> </th>
//                     </tr>
//
//                 </thead>
//             </table>
//             )}
//         </form>
//         <table>
//             <thead>
//                 <th>OrderID: <span>55</span></th>
//                 <th>Date: <span>5/10/2018</span></th>
//                 <th>Total: <span>$100.97</span></th>
//             </thead>
//         </table>
//         <form class="" action="/Account/RateDeliveryPerson" method="POST">
//             <table>
//                 <thead>
//                     <th>DeliveryPersonID: <span>5</span></th>
//                     <th>
//                         <select name="rating">
//                             <option selected>5</option>
//                             <option>4</option>
//                             <option>3</option>
//                             <option>2</option>
//                             <option>1</option>
//                         </select>
//                     </th>
//                     <th> <button type="submit" name="CHANGE">Rate</button> </th>
//                 </thead>
//             </table>
//         </form>
//         <form class="" action="/Account/RateFood" method="POST">
//             <table>
//                 <thead>
//                     <th>Food Ordered</th>
//                     <th>Qty</th>
//                     <th>Price</th>
//                     <th>Rating</th>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>Peperoni Pizza</td>
//                         <td>$10.00</td>
//                         <td>1</td>
//                         <td>
//                             <div>
//                                 <select name="rating">
//                                     <option>1</option>
//                                     <option>2</option>
//                                     <option>3</option>
//                                     <option>4</option>
//                                     <option selected>5</option>
//                                 </select>
//                             </div>
//                         </td>
//                         <td><button type="submit" name="CHANGE">Rate</button></td>
//                     </tr>
//                 </tbody>
//             </table>
//         </form>
//     </div>
// </div>
