import React, {Component} from "react";
import {View, Button,StyleSheet, Text} from "react-native";
import Subscriptions from './Subscriptions.js'



class Profile extends Component {
	state= {};
	render() {
	return (


		    <View style={styles.row}>
		     <View style={[styles.box]}>
                    <Text  >Profile</Text>
                </View>
                 <View style={[styles.box]}>
                    <Text style={styles.database}>User Name{"\n"}Currect Location</Text>
                </View>
                 <View style={[styles.box]}>
           	<Text>Subscriptions{"\n"}</Text>
        
                    <Text style={styles.database}>31</Text>
                </View>
            </View>


		
		)

	};


}
const styles = StyleSheet.create({
  database: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 10,
  },
    row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  box: {
    flex: 1,
    height: 100
  },
  two: {
    flex: 2
  }
});
export default Profile;