import React, { Component } from "react";
import { View, Button,Text, FlatList, ActivityIndicator } from "react-native";


// @delete data imports 
import user from './../Data/user.json';
import posts from './../Data/Posts.json';
import comments from './../Data/comments.json';

 

class Explore extends Component {
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
  }
}

export default Explore;
