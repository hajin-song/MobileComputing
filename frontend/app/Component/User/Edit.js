/**
 * Setting.js
 * View for User Settings Page
 * Created On: 07-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 07-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import styles  from './../../Style/Standard';

import { connect } from 'react-redux';

import PasswordUpdate from './Update/Password';
import DetailUpdate from './Update/UserDetails';

import { jsonToURLForm } from '../../Tool/DataFormat';

const mapStateToProps = (state) => {
 return {
  token: state.Session.token,
  userName: state.User.userName,
  userID: state.User.userID,
  lastName: state.User.lastName,
  firstName: state.User.firstName,
  dateOfBirth: state.User.dateOfBirth,
  address: state.User.address,
 }
};

const mapDispatchToProps = (dispatch) => {
 return ({
  updateUser: (user) => {
   dispatch({ 'type': UserActions.UPDATE_USER, 'user': user });
  },
 });
}


const UserEdit = ({token, userName, userID, lastName, firstName, dateOfBirth, address, updateUser, navigation, screenProps}) => {
 return(
  <View style={styles.container}>
   <ScrollView>
    <DetailUpdate
     token={token} userName={userName} userID={userID}
     lastName={lastName} firstName={firstName} dateOfBirth={dateOfBirth}
     address={address} onPress={updateUser}
     onMessage={screenProps.onMessage}
    />
    <PasswordUpdate
     userName={userName} token={token}
     onMessage={screenProps.onMessage}/>
   </ScrollView>
  </View>
 );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
