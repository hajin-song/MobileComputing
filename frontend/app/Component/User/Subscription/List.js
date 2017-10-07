import React, { Component } from 'react';
import { Button, Text, View, TouchableHighlight } from 'react-native';
import styles  from './../../../Style/Standard.js'

export default List = ({item, onPress}) => {
 return (
  <View>
   <View style={[styles.row, { justifyContent: 'center',  alignItems: 'center'}]}>
    <View style={styles.box}>
     <TouchableHighlight onPress={() => onPress()}>
      <Text style={styles.sectionItem}>{item.FirstName + ' ' + item.LastName}</Text>
     </TouchableHighlight>
    </View>
    <View style={styles.box}>
     <Button title="Unsubscribe" onPress={() => this.props.navigation.navigate("Profile")} />
    </View>
   </View>
   <View style={styles.seperator}/>
  </View>
 );
}
