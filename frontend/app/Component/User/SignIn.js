import React from "react";
import { connect } from 'react-redux';
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

import SessionActions from '../../Action/Session';

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

const SignIn = ({token, setToken}) => (
 <View style={{ paddingVertical: 20 }}>
   <Card>
     <FormLabel>Email</FormLabel>
     <FormInput placeholder="Email address..." />
     <FormLabel>Password</FormLabel>
     <FormInput secureTextEntry placeholder="Password..." />

     <Button
       buttonStyle={{ marginTop: 20 }}
       backgroundColor="#03A9F4"
       title="Sign In"
       onPress={() => {
        console.log("wheee!");
        console.log("ufufu");
        console.log(token, setToken);
        //console.log(setToken);
         //onSignIn().then(() =>  navigation.navigate("SignedIn"));
       }}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
