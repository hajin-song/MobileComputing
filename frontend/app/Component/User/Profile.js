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

/* data imports - @TODO remove later */
import user from './../Data/User.json';
import posts from './../Data/Posts.json';
import comments from './../Data/comments.json';



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


  renderHeader = () => {
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


      </View>
      <View style={[styles.row]}>

      <View style={[styles.box]}>
      <Text style={styles.username}> {user.FirstName} {user.LastName}</Text>
      <Text style={styles.location}> ({user.Location}) </Text>
      <Text style={styles.details}> {user.Details} </Text>
      </View>
      </View>

      <View style={[styles.seperator]} />
        <View style={[styles.row]}>
    <View style={[styles.box]}>
      <Text style={styles.details}> Posts </Text>
        </View>

      </View>
      <View style={[styles.seperator]} />

      </View>
    );
  };



  render() {
    return (

      <View style={styles.container}>
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList
      data={this.state.data}
      renderItem={({ item }) => (

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

      )}
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


  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
      }}
      >
      <ActivityIndicator animating size="large" />
      </View>
    );
  };

  /**
  * renderSeparator
  * @description renders the line seperator of list elements.
  */
  renderSeparator = () => {
    return (
      <View style={[styles.seperator]} />
    );
  };
}
