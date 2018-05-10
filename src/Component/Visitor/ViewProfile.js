import React, { Component } from 'react';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state =
        {

        };
    }

    componentDidMount() {

    }


    render() {
        let v = this.props.visitor;
        let p = this.props.pay;

        return [
          <div className='viewcontainer'>
            <h2 align='left'>Profile</h2>
            <form name='profile' action='/editprofile' method='post'>
              <table border='0' class='profiletable' align='left'>
                <tr>
                  <td width='215'><label>First Name<br/>
                    <input type="text" name='f_name' size='26' value={v.f_name} onChange={(e)=>this.props.onV(e)} required/>
                  </label></td>
                  <td><label>Last Name<br/>
                    <input type="text" name='l_name' size='26' value={v.l_name} onChange={(e)=>this.props.onV(e)} required/>
                  </label></td>
                </tr>
                <tr>
                  <td colspan='2'><label>Address<br/>
                    <input type="text" name='address' size='60' value={v.address} onChange={(e)=>this.props.onV(e)} required/>
                  </label></td>
                </tr>
                <tr>
                  <td colspan='2'><label>Phone Number<br/>
                    <input type="text" name='phoneNum' size='35' maxlength='15' value={v.phoneNum} onChange={(e)=>this.props.onV(e)}/>
                  </label></td>
                </tr>
                <tr>
                  <td style={{paddingTop:'40px'}}><label>Card Number<br/>
                    <input type="text" name='cardnum' size='26' maxlength='16' value={p.creditNum} onChange={(e)=>this.props.onP(e)}/>
                  </label></td>
                  <td style={{paddingTop:'40px'}}><label>Exp Date(mm/yy)<br/>
                    <input type="text" name='exp' size='17' maxlength='5' value={p.expiration} onChange={(e)=>this.props.onP(e)}/>
                  </label></td>
                </tr>
                <tr>
                  <td><label>CCV<br/>
                    <input type="text" name='ccv' size='3' maxlength='3' value={p.ccv} onChange={(e)=>this.props.onP(e)}/>
                  </label></td>
                </tr>
                <tr>
                  <td colspan='2' valign='bottom' align='right' height='30px'>
                    <input name='submit' type="submit" value='Save Changes'/>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        ];
    }
}

export default ViewProfile;
