import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SectionList, View } from 'react-native';
import styles  from './../../Style/Standard.js'

import Header from './Subscription/Header';
import List from './Subscription/List';

import { jsonToURLForm } from '../../Tool/DataFormat';

const mapStateToProps = (state) => {
 return {
  userName: state.User.userName,
  token: state.Session.token
 }
};

class Subscriptions extends Component {
 constructor(props){
  super(props);
  this.state = {
   authorities: [],
   friends: []
  }
 }
 componentWillMount(){
  let formBody = jsonToURLForm( { userName: this.props.userName } );
  console.log(formBody);
  fetch('http://eventchat.azurewebsites.net/api/Users/index?'+ formBody,{
   'method': 'GET',
   headers: {
    'Accept': 'application/json',
    'Authorization': this.props.token
   }
  }).then( (res) => {
   return res.json();
  }).then( (res) => {
   console.log(res);
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
     renderItem={ ({item}) => <List item={item} /> }
    />
   </View>
  );
 }
};

export default connect(mapStateToProps)(Subscriptions);
