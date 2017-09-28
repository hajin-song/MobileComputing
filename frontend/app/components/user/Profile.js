'use strict';
import React, { Component } from "react";
import {Alert,Image,Button, StyleSheet,FlatList,TextInput,ActivityIndicator,TouchableHighlight,AsyncStorage,Text,View} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";

import { onSignOut } from "./../../auth";

/* data imports */
import user from './../data/user.json';
import posts from './../data/posts.json';
import comments from './../data/comments.json';



 
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: posts,
      comments: comments,
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

    onLogout(){
    this.setState({showProgress: true})
    this.props.navigation.navigate("Logout")
    }
 
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

    renderHeader = () => {
   return (
       <View style={[styles.row]}>
             <View style={[styles.box]}>
                    <Image style={styles.stretch}  source={user.image}/> 
             </View>
             <View style={[styles.box]}>
                    <Text > {user.Name} </Text>
                    <Text style={styles.database}> {user.Description}{"\n"} {user.Location} </Text>
            </View>
             <View style={[styles.box]}>
                  <Text>Contributions {"\n"} </Text>
                  <Text style={styles.database}> {user.Contributions} </Text>

              </View>
              <View style={[styles.box]}>
                  <Text>Subscriptions {"\n"} </Text>
                  <Text style={styles.database}> {user.Subscriptions}   </Text>

              </View>
      </View>

    );
  };


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

  render() {
    return (
      
      <View>
       <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              
              title={`${item.Name}`}
              subtitle={item.Details}
              avatar={{uri:item.image }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.Name}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />


           <FlatList
          data={this.state.comments}
          renderItem={({ item }) => (
            <ListItem
              
              title={`${item.Comment}`}
              subtitle={item.EventID}
              avatar={{uri:item.image }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.CommentID}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
 


    <View style={[styles.row]}>
      <View style={[styles.box]}>
        <Button
        backgroundColor="#03A9F4"
        title="Settings"
        onPress={() =>  this.props.navigation.navigate("Settings")}
        />
      </View>
      <View style={[styles.box]}>

         <Button
        backgroundColor="#03A9F4"
        title="Log Out"
        onPress={() => onSignOut().then(() =>  this.props.navigation.navigate("SignedOut"))}
        />
      </View>
    </View>
 
    </View>
    );
  }
}
 
const styles = StyleSheet.create({
   stretch: {
    width: 80,
    height: 80
  },
  database: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 10,
  },
    row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10
  },
  box: {
    flex: 1,
    height: 100
  },

  container:{
    flexDirection:'row',
    padding:10

  },
  imageWrapper:{
    flex:1,
    justifyContent:'center',
    alignSelf:'center'
  },
  image:{
    height:60,
    width:60,
    borderRadius:30,
    alignSelf:'center'
  },
  username:{
    fontSize:15,
    color:'maroon',
    fontWeight:'400',
    textAlign:'center'
  }


});

export default Profile;