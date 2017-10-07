/**
 * List.js
 * View for User Subscription Page - List Section
 * Created On: 07-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 08-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React, { Component } from 'react';
import { Button, Text, View, TouchableHighlight } from 'react-native';
import { ActionButton } from '../../Common/Button';
import styles  from './../../../Style/Standard.js'

import { jsonToURLForm } from '../../../Tool/DataFormat';

export default class List extends Component {
 constructor(props){
  super(props);
  this.state = {
   subscribed: this.props.item.Subscribed,
   title: this.props.item.Subscribed ? 'Unsubscribe' : 'Subscribe',
   actionTriggered: false
  };
  this.__buttonClicked = this.__buttonClicked.bind(this);
 }
 /**
  * __buttonClicked : void
  * Subscription Action trigger
  */
 __buttonClicked(){
  this.setState({actionTriggered: true });
  let formBody = jsonToURLForm({
   isSubscribing: !this.state.subscribed,
   userName: this.props.userName,
   targetUserName: this.props.item.UserName
  });
  fetch('http://eventchat.azurewebsites.net/api/Users/Subscribe',{
   method: 'POST',
   headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': this.props.token
   },
   body: formBody
  }).then( (res) => {
   this.setState({actionTriggered: false });
   if(typeof(res.error) !== 'undefined'){
    this.props.screenProps.onMessage('error', 'Could not subscribe to the user!');
    return;
   }
   this.props.onMessage("success", "Subscription Success!!");
   this.setState({
    title: this.state.subscribed ? 'Subscribe' : 'Unsubscribe',
    subscribed: !this.state.subscribed,
   });
   if(this.state.subscribed){
    this.props.addSubscription({
     UserName: this.props.userName,
     targetUserName: this.props.item.UserName
    });
   }else{
    this.props.removeSubscription({
     UserName: this.props.userName,
     targetUserName: this.props.item.UserName
    });
   }
  }).catch( (err) => {
   this.setState({actionTriggered: false });
   this.props.onMessage("error", "Could not subscribe to the user!");
  });
 }
 render(){
  return (
   <View>
    <View style={[styles.row, { justifyContent: 'center',  alignItems: 'center'}]}>
     <View style={styles.box}>
      <TouchableHighlight onPress={() => onPress()}>
       <Text style={styles.sectionItem}>{this.props.item.FirstName + ' ' + this.props.item.LastName}</Text>
      </TouchableHighlight>
     </View>
     <View style={styles.box}>
      <ActionButton title={this.state.title} onPress={() => this.__buttonClicked()} disabled={this.state.actionTriggered} />
     </View>
    </View>
    <View style={styles.seperator}/>
   </View>
  );
 }
}
