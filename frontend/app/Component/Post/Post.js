/**
* Post.js
* Post View
* Created On: 01-Oct-2017
* Created By: Ha Jin Song
* Last Modified On: 07-Oct-2017
* Last Modified By: Najla
*/

import React, {Component} from "react";
import {View, TextInput ,Text ,  Image, StyleSheet,Dimensions,TouchableHighlight} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Style from './Style';
import { ActionButton } from '../Common/Button';
import EventActions from '../../Action/Event';
import styles from './../../Style/Standard.js'
import { jsonToURLForm } from '../../Tool/DataFormat';


const mapStateToProps = (state) => {
  return {
    token: state.Session.token,
    coordinate: state.Map.coordinate
  }
};

const mapDispatchToProps = (dispatch) => {
  return ({

  });
}

class Post extends Component {
  constructor(props){
    super(props);
    this.state = { title: '', content: '' }
    this.__post = this.__post.bind(this);
  }

 __post(){
  let formBody = jsonToURLForm(Object.assign({}, this.state, this.props.coordinate));
  fetch('http://eventchat.azurewebsites.net/post',{
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorize': this.props.token
   },
   body: formBody
  }).then( (res) => {
   return res.json();
  }).catch( (err) => {
   console.log(err);
  });
 }


 render() {
  return (
   <View style={Style.cameracontainer}>
    <TextInput
    placeholder = "What's on?"
    style={Style.title}
    onChangeText={ (title) => this.setState({title})}
    value={this.state.title}
    />
    <TextInput
    placeholder = "Tell the world more details..."
    multiline = {true}
    style={Style.input}
    onChangeText={ (content) => this.setState({content})}
    value={this.state.text}
    />
    <ActionButton title="Pin it" onPress = {() => this.__post()} />
   </View>
  );
 }
}



export default connect(mapStateToProps, mapDispatchToProps)(Post);
