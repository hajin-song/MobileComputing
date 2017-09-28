import React, { Component } from "react";
import { connect } from 'react-redux';
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

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
  this.state = {
   Username: '',
   Password: ''
  };
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
        secureTextEntry
        placeholder="Password..."
       />

       <Button
         buttonStyle={{ marginTop: 20 }}
         backgroundColor="#03A9F4"
         title="Sign In"
         onPress={ () => this.__authenticate()}
       />
       <Button
         buttonStyle={{ marginTop: 20 }}
         backgroundColor="#03A9F4"
         title="Register"
         onPress={() =>  this.props.navigation.navigate("Register")}
       />
     </Card>
   </View>
  );
 }
};



export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
