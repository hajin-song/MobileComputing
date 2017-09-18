import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {TabNavigator} from "react-navigation";

import EventMap from './Map/MapView.js';
import Profile from './Profile.js'
import Subscription from './Subscriptions.js'
import Post from './Post.js'
import Login from './Login.js';

const NavConfig = {
  Events : {screen: Subscription},
  Maps: {screen: EventMap},
  Post : {screen: Post},
  Profile: {screen: Profile}
}

const NavigationPanel = TabNavigator(NavConfig);

export default class AppContainer extends Component {
  state = {
    isLoggedIn: true
  }
render() {

   if (this.state.isLoggedIn) 
      return <View style={styles.container}>
        <NavigationPanel />
      </View>
    else 
      return <Login 
          onLoginPress={() => this.setState({isLoggedIn: true})}
        />;

   
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AppContainer', () => AppContainer);