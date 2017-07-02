import React, { Component } from 'react';

import Header from '../Header/Header';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <h1>This is SSR App.</h1>
      </div>
    );
  }

}

export default App;
