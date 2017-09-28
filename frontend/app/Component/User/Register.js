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
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

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
  var formBody = [];
  for(var prop in this.state){
   var encodedKey = encodeURIComponent(prop);
   var encodedValue = encodeURIComponent(this.state[prop]);
   formBody.push(encodedKey + "=" + encodedValue);
  };
  formBody = formBody.join('&');
  console.log(formBody);
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
       <FormLabel>Email</FormLabel>
       <FormInput
        value={this.state.Username}
        onChangeText={Username => this.setState({Username})}
        placeholder="Email address..."
       />

       <FormLabel>Password</FormLabel>
       <FormInput
        secureTextEntry
        value={this.state.Password}
        onChangeText={Password => this.setState({Password})}
        placeholder="Password..."
       />

       <FormLabel>Confirm Password</FormLabel>
       <FormInput
        secureTextEntry
        value={this.state.ConfirmPassword}
        onChangeText={ConfirmPassword => this.setState({ConfirmPassword})}
        placeholder="Confirm Password..."
       />

       <Button
         buttonStyle={{ marginTop: 20 }}
         backgroundColor="#03A9F4"
         title="SIGN UP"
         onPress={ () => this.__register()}
       />
       <Button
         buttonStyle={{ marginTop: 20 }}
         backgroundColor="#03A9F4"
         title="Sign In"
         onPress={() =>  this.props.navigation.navigate("Login")}
       />
     </Card>
   </View>
  )
 }
}

export default Register;
