/**
 * Register.js
 * View for Register Page
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 07-Oct-2017
 * Last Modified By: Ha Jin Song
 */
import React, { Component } from "react";
import { View } from "react-native";
import { Card } from "react-native-elements";
import { FormField, FormFieldPassword } from '../Common/FormField';
import { ActionButton } from '../Common/Button';

import { jsonToURLForm } from '../../Tool/DataFormat';

class Register extends Component{
 constructor(props){
  super(props);
  this.state = {
   Username: 'tester123',
   Password: 'qwerty',
   ConfirmPassword: 'qwerty',
   FirstName: 'empty',
   LastName: 'headed',
   Address: '120 Scholar Street',
   actionTriggered: false,
  }
  this.__register = this.__register.bind(this);
 }

 __register(){
  this.setState({actionTriggered: true });
  let formBody = jsonToURLForm(this.state);
  fetch('http://eventchat.azurewebsites.net/api/auth/register/', {
   method: 'POST',
   headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
   },
   body: formBody
  }).then( (res) => {
   if(typeof(res.error) !== 'undefined'){
    this.props.screenProps.onMessage('error', 'Registration Failed!');
    this.setState({actionTriggered: false });
    return;
   }
   this.props.screenProps.onMessage('success', 'Registration Complete!');
   this.props.navigation.navigate("Sign In");
   this.setState({actionTriggered: false });
  }).catch( (err) => {
   this.props.screenProps.onMessage('error', 'Registration Failed!');
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
      <FormFieldPassword
       title="Confirm Password"
       defaultValue={this.state.ConfirmPassword}
       placeholder="Confirm Password"
       onChange={ConfirmPassword => this.setState({ConfirmPassword})}
      />
      <ActionButton title="Register" onPress={ () => this.__register() } disabled={this.state.actionTriggered} />
     </Card>
   </View>
  )
 }
}

export default Register;
