/**
 * SignIn.js
 * Log In View
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 29-Sept-2017
 * Last Modified By: Ha Jin Song
 */

import React, { Component } from "react";
import { connect } from 'react-redux';
import { View } from "react-native";
import { Card } from "react-native-elements";

import { FormField, FormFieldPassword } from '../Common/FormField';
import { ActionButton } from '../Common/Button';

import SessionActions from '../../Action/Session';
import UserActions from '../../Action/User';
import { jsonToURLForm } from '../../Tool/DataFormat';

const mapStateToProps = (state) => {
 return {
  token: state.Session.token
 }
};

const mapDispatchToProps = (dispatch) => {
 return ({
  setToken: (token) => {
   dispatch({ "type": SessionActions.SET_AUTH_TOKEN, "token": token });
  },
  setUser: (user, subscriptions) => {
   dispatch({ 'type': UserActions.LOAD_USER, 'user': user, subscriptions: subscriptions });
  }
 });
}

class SignIn extends Component{
 constructor(props){
  super(props);
  this.state = { Username: 'tester123', Password: 'qwerty', actionTriggered: false };
  this.__authenticate = this.__authenticate.bind(this);
 }
 /**
  * __authenticate : void
  * Authenticates the user with information in the state
  * If successful, update the Application's Token and User information
  */
 __authenticate(){
  this.setState({actionTriggered:true});
  let formBody = jsonToURLForm(Object.assign({}, this.state, {'grant_type': 'password'}));
  fetch('http://eventchat.azurewebsites.net/token',{
   method: 'POST',
   headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
   },
   body: formBody
  }).then( (res) => {
   return res.json();
  }).then( (res) => {
    this.setState({actionTriggered: false });
   if(typeof(res.error) !== 'undefined'){
    this.props.screenProps.onMessage('error', 'Log In failed!');
    return;
   }
   console.log(res);
   this.props.setUser({
    firstName: res.firstName,
    lastName: res.lastName,
    address: res.address,
    dateOfBirth: res.dateOfBirth,
    userName: res.userName,
    userID: res.userID,
   }, JSON.parse(res.subscriptions));
   this.props.setToken(res.token_type + ' ' + res.access_token);
   this.props.screenProps.onMessage('success', 'Log In success!');
  }).catch( (err) => {
   console.log(err);
   this.props.screenProps.onMessage('error', 'Log In failed!');
   this.setState({actionTriggered: false });
  });
 }
 render(){
  return (
   <View style={{ paddingVertical: 20 }}>
     <Card>
      <FormField
       title="Email"
       defaultValue={this.state.Username}
       placeholder="Email Address"
       onChange={Username => this.setState({Username})}
      />
      <FormFieldPassword
       title="Password"
       defaultValue={this.state.Password}
       placeholder="Password"
       onChange={Password => this.setState({Password})}
      />
      <ActionButton title="Log In" onPress={ () => this.__authenticate() } disabled={this.state.actionTriggered} />
     </Card>
   </View>
  );
 }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
