import React, { Component } from 'react';
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = props.initState || {};
    console.log('state', this.state);
    if (typeof window !== 'undefined') {
      Detail.fetchData(this.setState.bind(this));
    }
  }

  render() {
    return (
      <dl>
        <dt>id</dt><dd>{this.state.id}</dd>
        <dt>username</dt><dd>{this.state.username}</dd>
        <dt>email</dt><dd>{this.state.email}</dd>
      </dl>
    );
  }

}

Detail.fetchData = function dataFetchData(callback) {
  return fetch('http://little-pond-8864.getsandbox.com/users/2')
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (typeof callback === 'function') {
        console.log('[fetch detail data]', data)
        callback(data);
      } else {
        return data
      }
    });
};

export default Detail;
