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
import { Image, FlatList,  ActivityIndicator, TouchableHighlight, Text, View} from 'react-native';
import { List } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './../../Style/Standard.js'

import Profile from './Show/Profile';

const mapStateToProps = (state) => {
 return {
  user: state.User.user,
  subscriptions: state.User.subscriptions,
  events: state.Event.events.filter( (event) => {
   console.log(event);
   return event.user !== null && event.user.UserName == state.User.user.userName;
  }),
 }
};

class UserShow extends Component {
 constructor(props) {
  super(props);
  this.state ={
   data: []
  }
 }

 renderHeader = () => {
  return (
   <Profile user={this.props.user} navigation={this.props.navigation} subscriptions={this.props.subscriptions} />
  )
 };

 renderList = (item) => {
  return (
   <View style={[styles.row]}>
    <View style={[styles.box]}>
     <View style={[styles.horizontalBox]} >
      <Text style={styles.title} > {item.Name} </Text><Text style={styles.date}>{item.comments == null ? 0 : item.comments.length} Comment(s)</Text>
     </View>
     <Text style={styles.date}>Coordinate - {item.Latitude}, {item.Longitude}</Text>
     <Text style={styles.date}>{item.Date}</Text>
    </View>
   </View>
  )
 }

 renderFooter = () => {
  return (
   <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
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
     <FlatList data={this.props.events}
      renderItem={({item}) => this.renderList(item)}
      keyExtractor={item => item.EventID}
      ItemSeparatorComponent={this.renderSeparator}
      ListHeaderComponent={this.renderHeader}
      ListFooterComponent={this.renderFooter}
      onEndReachedThreshold={50}
      />
    </List>
   </View>
  );
 }
}

export default connect(mapStateToProps)(UserShow);
