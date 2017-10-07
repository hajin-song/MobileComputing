/**
* Settings
* 1- Update personal information
* 2- Change password
*/

import React, {Component } from 'react';
import {Text,ScrollView,Button,View,TextInput,StyleSheet,TouchableHighlight,ActivityIndicatorIOS} from 'react-native';
import styles  from './../../Style/Standard.js'
import { Card } from "react-native-elements";
import { FormField, FormFieldPassword } from '../Common/FormField';
import DatePicker from 'react-native-datepicker'

/* data imports - @TODO remove later */
import user from './../Data/User.json';

import UserActions from '../../Actions/User';

export default class Settings extends Component {

  constructor(props) {
   super(props);
   this.state = {
    FirstName: user.FirstName,
    LastName: user.LastName,
    Username: user.UserName,
    Details: user.Details,
    Image: user.Image,
    Email: user.Email,
    DoB: user.DoB,
    Password: ""
   };
  };


  render() {
   return(
    <View style={styles.container}>
     <ScrollView>
      <View style={{ paddingVertical: 20 }}>
       <Card>
        <FormField
         title="First Name"
         defaultValue={this.state.FirstName}
         placeholder="First Name"
         onChange={FirstName => this.setState({FirstName})}
        />
        <FormField
         title="Last Name"
         defaultValue={this.state.LastName}
         placeholder="Last Name"
         onChange={LastName => this.setState({LastName})}
        />
        <FormField
         title="Details"
         defaultValue={this.state.Details}
         placeholder="Details"
         onChange={Details => this.setState({Details})}
        />
        <FormField
         title="Email"
         defaultValue={this.state.Email}
         placeholder="Email Address"
         onChange={Email => this.setState({Email})}
        />
        <FormField
         title="Location"
         defaultValue={this.state.Location}
         placeholder="Location"
         onChange={Location => this.setState({Location})}
        />
        <FormField
         title="Profile Picture"
         defaultValue={this.state.Image}
         placeholder="Profile Picture"
         onChange={Image => this.setState({Image})}
        />
        <DatePicker
         style={{width: 200}}
         date={this.state.DoB}
         mode="date"
         placeholder="Date of birth."
         format="DD-MM-YYYY"
         minDate="01-0-1-1900"
         maxDate="01-01-2002"
         confirmBtnText="Confirm"
         cancelBtnText="Cancel"
         customStyles={{
          dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 },
          dateInput: { marginLeft: 36 }
         }}
         onDateChange={(date) => {this.setState({DoB: date})}}
        />
        <View style={[styles.row]}>
         <View style={[styles.box]}>
          <Button title="Cancel" onPress={() => this.props.navigation.navigate("Profile")}/>
         </View>
         <View style={[styles.box]}>
          <Button title="Update" onPress={() => this.props.navigation.navigate("Profile")} />
         </View>
        </View>
       </Card>
      </View>
      <View style={{ paddingVertical: 20 }}>
       <Card>
        <FormFieldPassword
         title="New Password"
         defaultValue={this.state.Password}
         placeholder="New Password"
         onChange={Password => this.setState({Password})}
        />
        <FormFieldPassword
         title="Confirm Password"
         defaultValue={this.state.ConfirmPassword}
         placeholder="Confirm Password"
         onChange={ConfirmPassword => this.setState({ConfirmPassword})}
        />
       <View style={[styles.row]}>
        <View style={[styles.box]}>
         <Button title="Cancel" onPress={() => this.props.navigation.navigate("Profile")}/>
        </View>
        <View style={[styles.box]}>
         <Button title="Update" onPress={() => this.props.navigation.navigate("Profile")} />
        </View>
       </View>
      </Card>
     </View>
    </ScrollView>
   </View>
   );
 }
}
