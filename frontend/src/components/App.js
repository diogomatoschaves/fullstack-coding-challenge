import React, { Component } from 'react';
import '../App.css';
import Form from './Form'

class App extends Component {

  render() {
    
    return (
      <div className="flex-column" style={{width: '100%', height: '100%', minHeight: '500px'}}>
        <Form/>
      </div>
    );
  }
}

export default App;
