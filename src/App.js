import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, List, viewCCTV } from './export'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/List" component={List}/>
        <Route exact path="/viewCCTV" component={viewCCTV}/>
      </div>
    );
  }
}

export default App;
