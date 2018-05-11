import React, { Component } from 'react';
import './Complain.css';

class ComplainField extends Component{
  render(){
    let c = this.props.cinfo;
    return[
      <div>
        <h2 align='left'>File Complaint</h2>
        <form name='complain' action='/complain' method='post'>
          <table border='0' className='ctable'>
            <tr>
              <td align='left'>
                <span><b>Rating:</b> {c.rating} </span>
              </td>
            </tr>
            <tr>
              <td align='left'>
                <span><b>Subject:</b> {c.subject} </span>
              </td>
            </tr>
            <tr>
              <td style={{paddingTop:'10px'}}>
                <textarea name='complaint' rows='20' cols='80' maxlength='1500'/>
              </td>
            </tr>
            <tr>
              <td align='right'>
                <input type='submit' name='submit' value='Submit Complaint'/>
              </td>
            </tr>
          </table>
        </form>
      </div>
    ];
  }
}

class Complain extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
          Cinfo: {}
        };
    }

    componentDidMount() {
      fetch('/complaintInfo')
        .then(res => res.json())
        .then(info => this.setState({ Cinfo: info }));
    }


    render() {

        return (
          <div className='comcontainer'>
            <ComplainField cinfo={this.state.Cinfo}/>
          </div>
        );
    }
}

export default Complain;
