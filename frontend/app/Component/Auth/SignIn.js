/**
 * SignIn.js
 * Log In View
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 29-Sept-2017
 * Last Modified By: 29-Sept-2017
 */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { View } from "react-native";
import { Card } from "react-native-elements";

import { FormField, FormFieldPassword } from '../Common/FormField';
import { NavButton } from '../Common/Button';

import SessionActions from '../../Action/Session';
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
  }
 });
}

class SignIn extends Component{
 constructor(props){
  super(props);
  this.state = { Username: '', Password: '' };
  this.__authenticate = this.__authenticate.bind(this);
 }
 __authenticate(){
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
   this.props.setToken(res.token_type + ' ' + res.access_token);
  }).catch( (err) => {
   console.log(err);
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
      <NavButton title="Sign In" onPress={ () => this.__authenticate() } />
      <NavButton title="Back" onPress={ () => this.props.navigation.navigate("Main") } />
     </Card>
   </View>
  );
 }
};


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
