import React,{Component} from 'react'
import {StyleSheet,TouchableHighlight,TextInput , List,FlatList,View,Image,Text} from 'react-native'
import { List, ListItem } from "react-native-elements";
import { ActionButton } from '../Common/Button';

// @delete data imports 
import event from './../Data/Event.json'

export default class Event extends Component{
  __comment(){

  }
	render(){
  return(
	     <View>
	    	 <Text>{event.Source}</Text>
        	 <Text>{event.Name}</Text>
 			 <Text>{event.Date}</Text>
          	 <Text>{event.Details}</Text>
       		<Image  style={{width:'100%',height:250, marginBottom:5}} source = {{uri:event.Image}} />
        	 <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
 				<FlatList data={comments} renderItem={({ item }) => (
     				 <View>
       					  <Text key={item.CommentID} > {item.Commenter} {item.Comment} </Text>
       				 </View> )}
      						 keyExtractor={item => item.CommentID}
       					 	 onRefresh={this.handleRefresh}
      				 		 onEndReached={this.handleLoadMore}
   					         onEndReachedThreshold={1}
   					         />
      				  </List>
			<TextInput   /> 
		<ActionButton title="Comment" onPress = {() => this.__comment()} />


      </View>
	)
}
}