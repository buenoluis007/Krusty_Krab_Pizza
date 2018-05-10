import React, { Component } from 'react';
import ViewProfile from './ViewProfile';
import ViewOrderHistory from './ViewOrderHistory';
import ViewRate from './ViewRate';
import ViewFavorites from './ViewFavorites';
import './Visitor.css';

class Visitor extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Visitor: {},
            Pay: {},
            View: 0
        };

        this.changeView=this.changeView.bind(this);
    }

    componentDidMount() {
        fetch('/visitorInfo')
            .then(res => res.json())
            .then(info => this.setState({ Visitor: info }));
        fetch('/payInfo')
            .then(res => res.json())
            .then(info => this.setState({ Pay: info }));
    }

    changeView(view){
      this.setState({View: view});
    }

    render() {

        let body = null;
        console.log('View: '+this.state.View);
        switch(this.state.View){
          case 1:
            body = <ViewRate/>;
            break;
          case 2:
            body = <ViewOrderHistory/>;
            break;
          case 3:
            body = <ViewFavorites/>;
            break;
          default:
            body = <ViewProfile
                      visitor={this.state.Visitor}
                      pay={this.state.Pay}/>;
        }

        return [
          <div>
          <table border='0'>
            <tr>
              <td valign='top'>
                <div className='container leftpanel'>
                  {body}
                </div>
              </td>
              <td valign='top'>
                <div className='container rightpanel'>
                  <div className="visitornav" align="center">
                    <table border="0" height='200px'>
                      <tr><td><a onClick={()=>this.changeView(0)}>Profile</a></td></tr>
                      <tr><td><a onClick={()=>this.changeView(1)}>Rate</a></td></tr>
                      <tr><td><a onClick={()=>this.changeView(2)}>Order History</a></td></tr>
                      <tr><td><a onClick={()=>this.changeView(3)}>Favorites</a></td></tr>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          </div>
        ]
    }
}

export default Visitor;
