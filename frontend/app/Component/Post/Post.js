/**
* Post.js
* Post View
* Created On: 01-Oct-2017
* Created By: Ha Jin Song
* Last Modified On: 08-Oct-2017
* Last Modified By: Ha Jin Song
*/

import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, TextInput ,Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { ActionButton } from '../Common/Button';

import Style from './Style';
import GlobalStyle from './../../Style/Standard.js'

import EventActions from '../../Action/Event';

import { jsonToURLForm } from '../../Tool/DataFormat';


const mapStateToProps = (state) => {
 return {
  token: state.Session.token,
  coordinate: state.Map.coordinate,
  userName: state.User.user.userName
 }
};

const mapDispatchToProps = (dispatch) => {
  return ({
   addEvent: (event) => {
    console.log(event);
    dispatch({ "type": EventActions.CREATE_EVENT, "event": event });
   }
  });
}

class Post extends Component {
  constructor(props){
    super(props);
    this.state = { Name: '', Detail: '', actionTriggered: false }
    this.__post = this.__post.bind(this);
  }

 __post(){
  this.setState({actionTriggered: true });
  let params = {
   Longitude: this.props.coordinate.longitude,
   Latitude: this.props.coordinate.latitude,
   userName: this.props.userName,
   Name: this.state.Name,
   Detail: this.state.Detail
  };
  let formBody = jsonToURLForm(params);
  console.log(formBody);
  fetch('http://eventchat.azurewebsites.net/api/events/post',{
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': this.props.token
   },
   body: formBody
  }).then( (res) => {
   return res.json();
  }).then( (res) => {
   console.log(JSON.parse(res));
   this.setState({actionTriggered: false });
   if(typeof(res.error) !== 'undefined'){
    this.props.screenProps.onMessage('error', 'Could not Post the Event!');
    return;
   }
   var evt = JSON.parse(res);
   this.props.screenProps.onMessage('success', 'Event Created!!');
   this.props.addEvent(evt);
  }).catch( (err) => {
   console.log(res);
   this.props.screenProps.onMessage('error', 'Could not Post the Event!');
  });
 }


 render() {
  return (
   <View style={GlobalStyle.container}>
    <TextInput
    placeholder = "What's on?"
    style={GlobalStyle.title}
    onChangeText={ (Name) => this.setState({Name})}
    value={this.state.title}
    />
    <TextInput
    placeholder = "Tell the world more details..."
    multiline = {true}
    style={GlobalStyle.input}
    onChangeText={ (Detail) => this.setState({Detail})}
    value={this.state.text}
    />
    <ActionButton title="Pin it" onPress = {() => this.__post()} disabled={this.state.actionTriggered} />
   </View>
  );
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
