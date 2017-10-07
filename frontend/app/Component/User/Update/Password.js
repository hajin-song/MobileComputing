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
    ConfirmPassword: ""
   };
   this.__updatePassword = this.__updatePassword.bind(this);
  };


  __updatePassword(){
   let formBody = jsonToURLForm(Object.assign({}, this.state, {UserName: this.props.userName }));
   console.log(formBody, this.props.token);
   fetch('http://eventchat.azurewebsites.net/api/Users/UpdatePassword',{
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': this.props.token
    },
    body: formBody
   }).then( (res) => {
    if(typeof(res.error) !== 'undefined'){
     console.log(res);
     return;
    }
    console.log('success');
   }).catch( (err) => {
    console.log(err);
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
      <ActionButton title="Update" onPress={() => this.__updatePassword()} />
     </View>
    </Card>
   </View>
   );
 }
}
