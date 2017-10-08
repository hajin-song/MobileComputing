/**
 * Password.js
 * View for Password Change Page
 * Created On: 07-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 07-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import styles  from './../../../Style/Standard';
import { Card } from "react-native-elements";
import { FormFieldPassword } from '../../Common/FormField';
import { ActionButton } from '../../Common/Button';
import DatePicker from 'react-native-datepicker'

import UserActions from '../../../Action/User';

import { jsonToURLForm } from '../../../Tool/DataFormat';

export default class Password extends Component {
  constructor(props) {
   super(props);
   this.state = {
    Password: "",
    ConfirmPassword: "",
    actionTriggered: false
   };
   this.__updatePassword = this.__updatePassword.bind(this);
  };

  /**
   * __updatePassword : void
   * Updates the Password
   */
  __updatePassword(){
   this.setState({actionTriggered: true });
   let formBody = jsonToURLForm(Object.assign({}, this.state, {UserName: this.props.userName }));
   fetch('http://eventchat.azurewebsites.net/api/Users/UpdatePassword',{
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': this.props.token
    },
    body: formBody
   }).then( (res) => {
    this.setState({actionTriggered: false });
    if(typeof(res.error) !== 'undefined'){
     this.props.screenProps.onMessage('error', 'Failed Change Password!!');
     return;
    }
    this.props.screenProps.onMessage('success', 'Successfully Changed Password!');
   }).catch( (err) => {
    this.props.screenProps.onMessage('error', 'Failed Chang Password!');
    this.setState({actionTriggered: false });
   });
  }

  render() {
   return(
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
      <ActionButton title="Update" onPress={() => this.__updatePassword()} disabled={this.state.actionTriggered} />
     </View>
    </Card>
   </View>
   );
 }
}
