import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SectionList, View } from 'react-native';
import styles  from './../../Style/Standard.js'

import Header from './Subscription/Header';
import List from './Subscription/List';

import UserActions from '../../Action/User';

import { jsonToURLForm } from '../../Tool/DataFormat';

const mapStateToProps = (state) => {
 return {
  userName: state.User.user.userName,
  subscriptions: state.User.subscriptions,
  token: state.Session.token
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  addSubscription: (subscription) => {
   dispatch({ "type": UserActions.ADD_SUBSCRIPTION, "subscription": subscription });
  },
  removeSubscription: (subscription) => {
   dispatch({ "type": UserActions.REMOVE_SUBSCRIPTION, "subscription": subscription });
  }
 }
}

class Subscriptions extends Component {
 constructor(props){
  super(props);
  this.state = {
   authorities: [],
   friends: []
  }
 }
 componentWillMount(){
  // When Component is mounting, get users available for subscription
  let formBody = jsonToURLForm( { userName: this.props.userName } );
  fetch('http://eventchat.azurewebsites.net/api/Users/index?'+ formBody,{
   'method': 'GET',
   headers: {
    'Accept': 'application/json',
    'Authorization': this.props.token
   }
  }).then( (res) => {
   return res.json();
  }).then( (res) => {
   if(typeof(res.error) !== 'undefined'){
    this.props.screenProps.onMessage('error', 'Failed to retrieve User List!');
    return;
   }
   this.setState({friends: res });
  }).catch( (err) => {
   this.props.screenProps.onMessage('error', 'Failed to retrieve User List!');
  })
 }
 render() {
  return (
   <View style={styles.container}>
    <SectionList
     sections={[
      {title: 'Authorities', data: this.state.authorities},
      {title: 'Friends', data: this.state.friends},
     ]}
     keyExtractor={(item) => 'key-' + item.UserName}
     renderSectionHeader={({section}) => <Header title={section.title}/>}
     renderItem={ ({item}) => {
      return(
       <List
        item={item}
        token={this.props.token}
        userName={this.props.userName}
        onMessage={this.props.screenProps.onMessage}
        addSubscription={this.props.addSubscription}
        removeSubscription={this.props.removeSubscription}
       />
      )
      }
     }
    />
   </View>
  );
 }
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
