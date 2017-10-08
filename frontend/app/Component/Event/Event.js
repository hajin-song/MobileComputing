import React,{Component} from 'react'
import { FlatList, View, Text} from 'react-native'
import { List, ListItem } from "react-native-elements";

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
