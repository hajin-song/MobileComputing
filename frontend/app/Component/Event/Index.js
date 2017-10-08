/**
* Events
* 1- constructor: initializing states.
* 2- renderHeader: List's header, contains user's basic info.
* 3- render: List containing the user's posts.
* 4- renderFooter: Renders an activity indicator if list is loading.
* 5- renderSeparator: Renders the line seperator of list elements.
*/

import React,{Component} from 'react'
import {StyleSheet,TouchableHighlight,View,Image,Text,FlatList} from 'react-native'
import { connect } from 'react-redux';
import events from './../Data/Events.json'
import comments from './../Data/comments.json'
import { List, ListItem } from "react-native-elements";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { StackNavigator } from 'react-navigation';
import styles from './../../Style/Standard.js'

import EventList from './Index/List';

const mapStateToProps = (state) => {
 return {
  events: state.Event.events
 }
};

const mapDispatchToProps = (dispatch) => {
 return ({

 });
}

class Event extends Component{
 //Comments List within each event post.
 render(){
  return(
   <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
    <FlatList
     data={this.props.events}
     renderItem={({ item }) => <EventList item={item} navigation={this.props.navigation} />}
     keyExtractor={item => item.EventID}
     onRefresh={this.handleRefresh}
     onEndReached={this.handleLoadMore}
     onEndReachedThreshold={50}
    />
   </List>
  );
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
