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
  };
  this.__buttonClicked = this.__buttonClicked.bind(this);
 }
 __buttonClicked(){
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
   console.log(res);
   this.props.onMessage("success", "Subscription Success!!");
   this.setState({
    title: this.state.subscribed ? 'Subscribe' : 'Unsubscribe',
    subscribed: !this.state.subscribed,
   });
  }).catch( (err) => {
   this.props.onMessage("error", "Could not subscribe to the user!");
   console.log(err);
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
      <ActionButton title={this.state.title} onPress={() => this.__buttonClicked()} />
     </View>
    </View>
    <View style={styles.seperator}/>
   </View>
  );
 }
}
