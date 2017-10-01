/**
 * Register.js
 * View for Register Page
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 29-Spet-2017
 * Last Modified By: Ha Jin Song
 */
import React, { Component } from "react";
import { View } from "react-native";

import { Card } from "react-native-elements";
import { FormField, FormFieldPassword } from '../Common/FormField';
import { NavButton } from '../Common/Button';

import { jsonToURLForm } from '../../Tool/DataFormat';

class Register extends Component{
 constructor(props){
  super(props);
  this.state = {
   Username: '',
   Password: '',
   ConfirmPassword: ''
  }
  this.__register = this.__register.bind(this);
 }

 __register(){
  let formBody = jsonToURLForm(this.state);
  fetch('http://eventchat.azurewebsites.net/api/auth/register/', {
   method: 'POST',
   headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
   },
   body: formBody
  }).then( (res) => {
   this.props.navigation.navigate("Login");
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
      <FormFieldPassword
       title="Confirm Password"
       defaultValue={this.state.ConfirmPassword}
       placeholder="Confirm Password"
       onChange={ConfirmPassword => this.setState({ConfirmPassword})}
      />
      <NavButton title="Register" onPress={ () => this.__register() } />
     </Card>
   </View>
  )
 }
}

export default Register;
