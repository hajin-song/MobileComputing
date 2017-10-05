import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './app/index'

export default class EventChat extends Component {
  render() {
    return (
      <App/>
    );
  }
}


AppRegistry.registerComponent('EventChat', () => EventChat);