/**
* Profile
* 1- constructor: initializing states.
* 2- renderHeader: List's header, contains user's basic info.
* 3- render: List containing the user's posts.
* 4- renderFooter: Renders an activity indicator if list is loading.
* 5- renderSeparator: Renders the line seperator of list elements.
*/

import React, { Component } from "react";
import {Alert,Image,Button,FlatList,TextInput,ActivityIndicator,TouchableHighlight,AsyncStorage,Text,View} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './../../Style/Standard.js'

export default class Profile extends Component {
 constructor(props) {
  super(props);
  this.state = {
   loading: false,
   data: posts, //@data of posts imported from JSON
   comments: comments, //@data of comments imported from JSON
   refreshing: false
  };
 }

 renderHeader() {
  return (
   <View>
    <View style={[styles.row]}>
     <View style={[styles.box]}>
      <Image style={styles.profileImage}  source={{uri:user.Image}} />
     </View>
     <View style={[styles.box]}>
      <Text style={styles.profileNumbers}> {user.Contributions} </Text>
      <Text>Contributions {"\n"} </Text>
     </View>
     <View style={[styles.box]}>
      <TouchableHighlight onPress={() => this.props.navigation.navigate("Subscriptions")}>
       <Text style={styles.profileNumbers}> {user.Subscriptions}   </Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => this.props.navigation.navigate("Subscriptions")}>
       <Text>Subscriptions {"\n"} </Text>
      </TouchableHighlight>
     </View>
     <View style={[styles.box]}>
      <TouchableHighlight onPress={() => this.props.navigation.navigate("Settings")}>
       <Ionicons name ='ios-settings-outline' size={30} color={'black'} />
      </TouchableHighlight>
     </View>
     <View style={[styles.box]}>
      <TouchableHighlight onPress={() => this.props.navigation.navigate("Login")}>
       <MaterialCommunityIcons name ='logout' size={30}  color={'black'} />
      </TouchableHighlight>
     </View>
    </View>
    <View style={[styles.row]}>
     <View style={[styles.box]}>
      <Text style={styles.userName}> {user.firstName} {user.lastName}</Text>
      <Text style={styles.location}> ({user.Location}) </Text>
      <Text style={styles.details}> {user.Details} </Text>
     </View>
    </View>
   </View>
  );
 };

}
