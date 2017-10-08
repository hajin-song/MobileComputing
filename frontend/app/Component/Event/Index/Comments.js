/**
 * Comments.js
 * View for Event Index - Comments Section
 * Created On: 08-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 08-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from './../../../Style/Standard.js'

export default Comments = ({comments}) =>  {
 return(
  <FlatList
   data={comments}
   renderItem={({ item }) => (
    <View>
    <Text key={item.CommentID} > {item.Commenter} {item.Comment} </Text>
    </View>
   )}
   keyExtractor={item => item.CommentID}
   onEndReachedThreshold={1}
  />
 );
}
