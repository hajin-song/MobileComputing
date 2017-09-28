import React, { Component } from "react";
import { View, Button,Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

//@delete data import
import subscriptions from './../data/authorities.json';



class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: subscriptions,
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
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
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
           <ListItem
              roundAvatar
              title={`${item.Name}`}
              subtitle={item.Description}
              avatar={{ uri: item.image }}
              containerStyle={{ borderBottomWidth: 0 }}
            />  
          )}
          keyExtractor={item => item.Name}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
}

export default Explore;