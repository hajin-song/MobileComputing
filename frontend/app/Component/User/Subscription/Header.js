import React, { Component } from 'react';
import {  Text, View } from 'react-native';
import styles  from './../../../Style/Standard.js'

export default Header = ({title}) => {
 return (
  <View><Text style={styles.sectionHeader}>{title}</Text></View>
 );
}
