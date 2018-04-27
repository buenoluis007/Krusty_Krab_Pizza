import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Component/Routes/Routes';

class App extends Component {
  // Hi There
   render() {
        return (
          <BrowserRouter>
            <div className="App">
              <Routes/>
            </div>
          </BrowserRouter>
        );
    }
}
export default App;
