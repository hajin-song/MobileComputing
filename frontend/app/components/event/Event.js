import React,{Component} from 'react'
import {StyleSheet,TouchableHighlight,FlatList,View,Image,Text} from 'react-native'
import { List, ListItem } from "react-native-elements";

// @delete data imports 
import event from './../data/event.json'

export default class Event extends Component{

	render(){
  return(
	     <View>
         <Text>{event.Name}</Text>
         <Text>{event.Details}</Text>
      </View>
	)
}
}