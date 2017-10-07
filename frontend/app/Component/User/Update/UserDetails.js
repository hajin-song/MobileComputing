/**
 * UserDetails.js
 * View for User Detail Change Page
 * Created On: 07-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 07-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React, {Component } from 'react';
import { View } from 'react-native';
import styles  from './../../../Style/Standard';
import { Card } from "react-native-elements";
import { FormField } from '../../Common/FormField';
import { ActionButton } from '../../Common/Button';
import DatePicker from 'react-native-datepicker'

import UserActions from '../../../Action/User';

import { jsonToURLForm } from '../../../Tool/DataFormat';

export default class UserDetails extends Component {
  constructor(props) {
   super(props);
   this.state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    userName: this.props.userName,
    address: this.props.address,
    Details: '',
    Image: '',
    dateOfBirth: this.props.dateOfBirth,
    actionTriggered: false
   };
   this.__updateUser = this.__updateUser.bind(this);
  };
  __updateUser(){
   this.setState({actionTriggered: true });
   let formBody = jsonToURLForm(this.state);
   fetch('http://eventchat.azurewebsites.net/api/Users/Update',{
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': this.props.token
    },
    body: formBody
   }).then( (res) => {
    console.log(res, 'nyokiki!');
    if(typeof(res.error) !== 'undefined'){
     console.log(res);
     this.props.screenProps.onMessage('error', 'Failed to Change Details!');
     this.setState({actionTriggered: false });
     return;
    }
    this.props.screenProps.onMessage('success', 'Successfully Changed Details!');
    this.setState({actionTriggered: false });
   }).catch( (err) => {
    console.log(err);
    this.props.screenProps.onMessage('error', 'Failed to Change Details!');
    this.setState({actionTriggered: false });
   });
  }
  render() {
   return(
    <View style={{ paddingVertical: 20 }}>
     <Card>
      <FormField
       title="Profile Picture"
       defaultValue={this.state.Image}
       placeholder="Profile Picture"
       onChange={Image => this.setState({Image})}
      />
      <FormField
       title="First Name"
       defaultValue={this.state.firstName}
       placeholder="First Name"
       onChange={firstName => this.setState({firstName})}
      />
      <FormField
       title="Last Name"
       defaultValue={this.state.lastName}
       placeholder="Last Name"
       onChange={lastName => this.setState({lastName})}
      />
      <FormField
       title="Details"
       defaultValue={this.state.Details}
       placeholder="Details"
       onChange={Details => this.setState({Details})}
      />
      <FormField
       title="address"
       defaultValue={this.state.address}
       placeholder="address"
       onChange={address => this.setState({address})}
      />
      <DatePicker
       style={{width: 200}}
       date={this.state.dateOfBirth}
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
       onDateChange={(dateOfBirth) => {this.setState({DoB: dateOfBirth})}}
      />
      <View style={[styles.row]}>
       <ActionButton title="Update" onPress={() => this.__updateUser()} disabled={this.state.actionTriggered} />
      </View>
     </Card>
    </View>
   );
 }
}
