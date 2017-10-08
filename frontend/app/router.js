/**
 * Router.js
 * Navigation Routing for application
 */

import React, { Component } from "react";
import { View } from "react-native";
import { connect } from 'react-redux';
import GuestNav from './Component/Nav/Guest';
import UserNav from './Component/Nav/User';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
const mapStateToProps = (state) => {
 return {
  token: state.Session.token
 }
};

class AppNav extends Component{
 componentDidMount() {
   // Register the alert located on this master page
   // This MessageBar will be accessible from the current (same) component, and from its child component
   // The MessageBar is then declared only once, in your main component.
   MessageBarManager.registerMessageBar(this.refs.alert);
 }
 componentWillUnmount() {
   // Remove the alert located on this master page from the manager
   MessageBarManager.unregisterMessageBar();
 }

 __showMessage(type, message){

  MessageBarManager.showAlert({
   title: 'Event Chat',
   message: message,
   alertType: type
  });
 }

 render(){
  if(this.props.token == ""){
   return (
    <View style={{flex:1}}>
     <GuestNav screenProps={{ onMessage: this.__showMessage }}/>
     <MessageBarAlert ref="alert" style={{flex: 1}}/>
    </View>
   )
  }
  return (
   <View style={{flex:1}}>
    <UserNav screenProps={{ onMessage:this.__showMessage}} />
    <MessageBarAlert ref="alert" style={{flex: 1}}/>
   </View>
  )
 }
}

export default connect(mapStateToProps)(AppNav);
