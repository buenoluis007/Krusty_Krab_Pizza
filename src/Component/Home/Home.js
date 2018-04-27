import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render() {
        return (
          <div className="home">
            <h1 className='welcome'>Welcome to Krusty Krab Pizza</h1>
            <h2 className='welcome' id='slogan'>Where You'll Find The Pizza Of Your Life</h2>
          </div>
      )
    }
}

export default Home;
