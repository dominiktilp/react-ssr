import React, { Component } from 'react';

import Header from '../Header/Header';
import Detail from '../Detail/Detail';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <h1>This is SSR App.</h1>
        <Detail initState={this.props.initState} />
      </div>
    );
  }

}

App.fetchData = function appFetchData() {
  return Detail.fetchData();
};

export default App;
