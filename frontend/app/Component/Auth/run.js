
'use strict';
import React, {Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Login from './login';
import Register from './register';
import Root from './root';
import Profile from './root';

import App from './home.js';
import Update from './../User/update.js';
import Events from './../Event/Events.js';

export default class ReactNativeRailsAuth extends Component {

  renderScene(route, navigator) {
    console.log(route);
    if(route.name == 'root') {
      return <Root navigator={navigator} />
    }
    if(route.name == 'event') {
      return <Event navigator={navigator} />
    }
    if(route.name == 'register') {
      return <Register navigator={navigator} />
    }
    if(route.name == 'login') {
      return <Login navigator={navigator} />
    }
    if(route.name == 'home') {
      return <Events navigator={navigator} {...route.passProps} />
    }
    if(route.name == 'update') {
      return <Update navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'root'}}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
