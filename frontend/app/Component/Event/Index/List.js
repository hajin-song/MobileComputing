/**
 * List.js
 * View for Event Index - List Section
 * Created On: 08-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 08-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React from 'react'
import { TouchableHighlight, View, Image, Text} from 'react-native'
import { List } from "react-native-elements";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './../../../Style/Standard'

import Comments from './Comments';

export default EventList = ({ item, navigation }) => {
 //Comments List within each event post.
 return(
  <TouchableHighlight onPress={() => navigation.navigate("Event")}>
   <View key={item.EventID}>
    <View>
     <Text style={styles.title}>{item.Name}</Text>
     <Text style={styles.date}>Coordinate - {item.Latitude}, {item.Longitude}</Text>
     <Text style={styles.date}>{item.Date}</Text>
     <Text style={styles.details}>{item.Details}</Text>
    </View>
    <Image  style={{width:'100%',height:250, marginBottom:5}} source = {{uri:''}} />
    <EvilIcons name ='comment' size={30}  />
    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
     <Comments comments={item.comments}/>
    </List>
    <Text>{'\n'}</Text>
   </View>
  </TouchableHighlight>
 );
}
