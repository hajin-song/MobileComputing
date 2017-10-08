/**
 * Header.js
 * View for User Subscription Page - Header Section
 * Created On: 07-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 08-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React from 'react';
import { Text, View } from 'react-native';
import styles  from './../../../Style/Standard.js'

export default Header = ({title}) => {
 return (
  <View><Text style={styles.sectionHeader}>{title}</Text></View>
 );
}
