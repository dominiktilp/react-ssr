import React, { Component } from 'react';
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.fetchData();
  }

  fetchData() {
    const self = this;
    fetch('/api/test')
      .then(response => {
        return response.json();
      })
      .then(data => {
        self.setState(data);
      });
  }

  render() {
    return (
      <dl>
        <dt>name</dt><dd>{this.state.name}</dd>
      </dl>
    );
  }

}

export default Detail;
