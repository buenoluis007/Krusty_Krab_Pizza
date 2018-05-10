import React, { Component } from 'react';

class ViewOrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state =
        {

        };
    }

    componentDidMount() {

    }


    render() {

        return (
          <div className='viewcontainer'>
            <h2 align='left'>Profile</h2>
            <form>
              <table border='0' class='profiletable'>
                <tr>
                  <td colspan='2'><label>Full Name<br/>
                    <input type="text" size='60' required/>
                  </label></td>
                </tr>
                <tr>
                  <td><label>Card Number<br/>
                    <input type="text" size='35' required/>
                  </label></td>
                  <td><label>Exp Date<br/>
                    <input type="text" size='17' required/>
                  </label></td>
                </tr>
                <tr>
                  <td><label>CCV<br/>
                    <input type="text" size='3' required/>
                  </label></td>
                </tr>
                <tr>
                  <td colspan='2' style={{paddingTop:'40px'}}><label>Address<br/>
                    <input type="text" size='60' required/>
                  </label></td>
                </tr>
                <tr>
                  <td width='270'><label>City<br/>
                    <input type="text" size='35' required/>
                  </label></td>
                  <td><label>State<br/>
                    <input type="text" size='17' required/>
                  </label></td>
                </tr>
                <tr>
                  <td colspan='2'><label>Postal Code<br/>
                    <input type="text" size='35' required/>
                  </label></td>
                </tr>
                <tr>
                  <td colspan='2'><label>Phone Number<br/>
                    <input type="text" size='35' required/>
                  </label></td>
                </tr>
              </table>
            </form>
          </div>
        );
    }
}

export default ViewOrderHistory;
