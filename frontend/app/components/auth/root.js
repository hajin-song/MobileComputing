'use strict';
import React, {Component } from 'react';
import { StyleSheet, TouchableHighlight, AsyncStorage, Text, View} from 'react-native';
import Maps from '../map/MapView.js'

const ACCESS_TOKEN = 'access_token';

class Root extends Component {

  componentWillMount() {
    this.getToken();
  }
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken) {
          console.log("Token not set");
      } else {
          this.verifyToken(accessToken)
      }
    } catch(error) {
        console.log("Something went wrong");
    }
  }
  //If token is verified we will redirect the user to the home page
  async verifyToken(token) {
    let accessToken = token
/*
    try {
      let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/verify?session%5Baccess_token%5D='+accessToken);
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        //Verified token means user is logged in so we redirect him to home.
        this.navigate('home');
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(error) {
        console.log("error response: " + error);
    }*/
  }
  render() {
    return (
    
      <View style={styles.container}>

        <Maps />
          <TouchableHighlight onPress={ this.navigate.bind(this,'register') } style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={ this.navigate.bind(this, 'login') } style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
       flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
   
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    alignItems: 'center',
   
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  title: {
    fontSize: 25
  }
});


export default Root