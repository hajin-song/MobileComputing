/**
* Events
* 1- constructor: initializing states.
* 2- renderHeader: List's header, contains user's basic info.
* 3- render: List containing the user's posts.
* 4- renderFooter: Renders an activity indicator if list is loading.
* 5- renderSeparator: Renders the line seperator of list elements.
*/

import React, { Component } from 'react'
import { TouchableHighlight, View, Image, Text} from 'react-native'
import { List } from "react-native-elements";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './../../../Style/Standard'

import Comments from './Comments';

export default class EventList extends Component{
 //Comments List within each event post.
 render(){
  return(
   <TouchableHighlight onPress={() => this.props.navigation.navigate("Event")}>
    <View key={this.props.item.EventID}>
     <View>
      <Text style={styles.title}>{this.props.item.Name}</Text>
      <Text style={styles.date}>{this.props.item.Latitude},{this.props.item.Longitude}</Text>
      <Text style={styles.date}>{this.props.item.Date}</Text>
      <Text style={styles.details}>{this.props.item.Details}</Text>
     </View>
     <Image  style={{width:'100%',height:250, marginBottom:5}} source = {{uri:''}} />
     <EvilIcons name ='comment' size={30}  />
     <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <Comments comments={this.props.item.comments}/>
     </List>
     <Text> {'\n'} </Text>
    </View>
   </TouchableHighlight>

  );
 }
}
