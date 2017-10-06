import React, { Component } from "react";
import { View, Button,Text, TouchableHighlight,FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import styles  from './../../Style/Standard.js'

//@delete data import
import users from './../Data/Authorities.json';



class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: users,
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

  renderHeader = () => {
    return <SearchBar placeholder="Search" lightTheme round />;
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


            <View>
            <View  key={item.ID} style={styles.row}>
            <View   style={styles.box}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate("ExploreView")}>
            <Text style={styles.sectionItem}>{item.Name}</Text>
            </TouchableHighlight>
            </View>



            </View>
            <View style={styles.seperator}/>
            </View>


          )}
          keyExtractor={item => item.ID}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
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
