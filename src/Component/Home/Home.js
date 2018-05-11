import React, { Component } from 'react';
import './Home.css';
import Maps from '../Map/googleMaps';
import DeliveryPage from '../Delivery/Delivery';


class Home extends Component {
    constructor() {
        super();
        this.state =
        {
          Users : [],
        };
    }
    componentDidMount() {
        fetch('/user')
          .then(res => res.json())
          .then(user => this.setState({ Users: user }));
    }

    render() {

        let home = (
            <div className="home">
              <h1 className='welcome'>Welcome to Krusty Krab Pizza</h1>
              <h2 className='welcome' id='slogan'>Where You will Find The Pizza Of Your Life</h2>


                < Maps />

            </div>
        )

        // if(this.state.Users.type === 'Delivery'){
        //     home = (
        //         <div>
        //             < DeliveryPage />
        //         </div>
        //     )
        // }

        return (
            <div className="home">
                  <h1 className='welcome'>Welcome to Krusty Krab Pizza</h1>
                  <h2 className='welcome' id='slogan'>Where You will Find The Pizza Of Your Life</h2>


                    < Maps />

            </div>
      )
    }
}

export default Home;
