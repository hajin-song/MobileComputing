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

  //Comments List within each event post.

  render(){
    return(
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList data={events} renderItem={({ item }) => (
       			 <TouchableHighlight onPress={() => this.props.navigation.navigate("Event")}>
       				 <View key={item.EventID} >
       					 <View >
       						 <Text style={styles.title} > {item.Name} </Text><Text style={styles.date} > {item.Location} </Text>
       						 <Text style={styles.date} > {item.Date} </Text><Text style={styles.details}> {item.Details} </Text>
       					 </View>
       					 <Image  style={{width:'100%',height:250, marginBottom:5}} source = {{uri:item.Image}} />
       					 <EvilIcons name ='comment' size={30}  />
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

       				 <Text> {'\n'} </Text>
       				 </View>
      		     </TouchableHighlight>
      )}
      
      keyExtractor={item => item.EventID}
      onRefresh={this.handleRefresh}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={50}
      />
      </List>

    );}}
