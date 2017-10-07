/**
 * Show.js
 * View for User Detail Change Page
 * Created On: 07-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 07-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React, { Component } from "react";
import { connect } from 'react-redux';
import {Alert,Image,Button,FlatList,TextInput,ActivityIndicator,TouchableHighlight,AsyncStorage,Text,View} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './../../Style/Standard.js'

/* data imports - @TODO remove later */
import user from './../Data/User.json';
import posts from './../Data/Posts.json';
import comments from './../Data/comments.json';

import Profile from './Show/Profile';

const mapStateToProps = (state) => {
 return {
  user:{
   userName: state.User.userName,
   userID: state.User.userID,
   lastName: state.User.lastName,
   firstName: state.User.firstName,
   dateOfBirth: state.User.dateOfBirth,
   address: state.User.address,
  }
 }
};

class UserShow extends Component {
 constructor(props) {
  super(props);
  this.state = {
   loading: false,
   data: posts, //@data of posts imported from JSON
   comments: comments, //@data of comments imported from JSON
   refreshing: false
  };
 }

 renderHeader = () => {
  return (
   <Profile user={this.props.user} navigation={this.props.navigation} />
  )
 };

 renderList = () => {
  return (
   <TouchableHighlight onPress={() => this.props.navigation.navigate("PostDetails")}>
    <View key={item.ID} style={[styles.row]}>
     <View style={[styles.box]}>
      <View style={[styles.horizontalBox]} >
       <Text style={styles.title} > {item.Name} </Text><Text style={styles.date} > {item.Comments} Comment(s) </Text>
      </View>
      <Text style={styles.date} > {item.Location}</Text>
      <Text style={styles.date} > {item.Date} </Text>
     </View>
     <View style={[styles.box]}>
      <Image  style={{height:180,marginTop:5,marginBottom:5}} source = {{uri:item.Image}} />
     </View>
    </View>
   </TouchableHighlight>
  )
 }

 renderFooter = () => {
  if (!this.state.loading) return null;
  return (
   <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
    <ActivityIndicator animating size="large" />
   </View>
  );
 };

 renderSeparator = () => {
  return (
   <View style={[styles.seperator]} />
  );
 };

 render() {
  return (
   <View style={styles.container}>
    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
     <FlatList data={this.state.data}
     renderItem={({item}) => this.renderList}
      keyExtractor={item => item.ID}
      onRefresh={this.handleRefresh}
      ItemSeparatorComponent={this.renderSeparator}
      ListHeaderComponent={this.renderHeader}
      ListFooterComponent={this.renderFooter}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={50}
      />
    </List>
   </View>
  );
 }
}

export default connect(mapStateToProps)(UserShow);
