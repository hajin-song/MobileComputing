/**
 * Profile.js
 * View for User Detail Page - Profile Section
 * Created On: 07-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 07-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React from "react";
import { Image, TouchableHighlight, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './../../../Style/Standard.js'

export default Profile = ({user, navigation}) => {
 return (
  <View>
   <View style={[styles.row]}>
    <View style={[styles.box]}>
     <Image style={styles.profileImage} />
    </View>
    <View style={[styles.box]}>
     <TouchableHighlight onPress={() => navigation.navigate("Subscriptions")}>
      <View style={{justifyContent: 'center',  alignItems: 'center'}}>
       <Text style={styles.profileNumbers}>{user.subscriptions} </Text><Text>Subscriptions</Text>
      </View>
     </TouchableHighlight>
    </View>
    <View style={[styles.box]}>
     <View style={[styles.box, { alignSelf: 'flex-end'}]}>
      <TouchableHighlight onPress={() => navigation.navigate("UserEdit")}>
       <Ionicons name ='ios-settings-outline' size={30} color={'black'} />
      </TouchableHighlight>
     </View>
     <View style={[styles.box, { alignSelf: 'flex-end'}]}>
      <TouchableHighlight onPress={() => navigation.navigate("Sign In")}>
       <MaterialCommunityIcons name ='logout' size={30}  color={'black'} />
      </TouchableHighlight>
     </View>
    </View>
   </View>
   <View style={[styles.row]}>
    <View style={[styles.box]}>
     <Text style={styles.userName}> {user.firstName} {user.lastName}</Text>
     <Text style={styles.location}> ({user.address}) </Text>
    </View>
   </View>
   <View style={[styles.seperator]}>
   </View>
   <View style={[styles.row]}>
    <View style={[styles.box]}>
     <Text style={styles.details}>Posts</Text>
    </View>
   </View>
   <View style={[styles.seperator]}>
   </View>
  </View>
 );
}
