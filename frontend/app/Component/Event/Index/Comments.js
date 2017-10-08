/**
* Events
* 1- constructor: initializing states.
* 2- renderHeader: List's header, contains user's basic info.
* 3- render: List containing the user's posts.
* 4- renderFooter: Renders an activity indicator if list is loading.
* 5- renderSeparator: Renders the line seperator of list elements.
*/

import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from './../../../Style/Standard.js'

export default class Comments extends Component{
 //Comments List within each event post.
 render(){
  return(
      <FlatList
       data={this.props.comments}
       renderItem={({ item }) => (
        <View>
        <Text key={item.CommentID} > {item.Commenter} {item.Comment} </Text>
        </View>
       )}
       keyExtractor={item => item.CommentID}
       onRefresh={this.handleRefresh}
       onEndReached={this.handleLoadMore}
       onEndReachedThreshold={1}
      />
  );
 }
}
