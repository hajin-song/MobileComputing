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
import events from './../Data/Events.json'
import comments from './../Data/comments.json'
import { List, ListItem } from "react-native-elements";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { StackNavigator } from 'react-navigation';
import styles from './../../Style/Standard.js'

export default class Event extends Component{
 render(){
  return(
   <View></View>
  );
 }
}
