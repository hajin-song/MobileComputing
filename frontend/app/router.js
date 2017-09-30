/**
 * Router.js
 * Navigation Routing for application
 */

import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator, addNavigationHelpers } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import Main from './Component/Map/MapView';

import Login from './Component/Auth/SignIn.js';
import Register from './Component/Auth/Register';

import Settings from './Component/User/Settings';
import Profile from './Component/User/Profile.js';

import Events from './Component/Event/Events.js';
import EventMap from './Component/Map/MapView.js';
import Event from './Component/Event/Event.js';
import Post from './Component/Post/Post.js';
import Explore from './Component/Users/Explore.js';
import Subscriptions from './Component/Users/Subscriptions.js';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
 Main: {
  screen: EventMap
 },
 Login: {
  screen: Login,
  navigationOptions: ({ navigation }) =>{
   title: "Login",
   headerStyle
  }
 },
 Register: {
  screen: Register,
  navigationOptions:  ({ navigation }) =>{
   title: "Sign Up",
   headerStyle
  }
 }
});

// ===================== Navigation Components ========================== //
let eventsNav = {
 screen: StackNavigator({
  Events: {
   screen: Events,
   navigationOptions: ({navigation}) => ({
    title: "Events",
    headerStyle: { paddingRight: 10, paddingLeft: 10 }
   })
  },
  Event: {
   screen: Event,
   navigationOptions: (props) => ({
    title: "",
   })
  }
 }),
 navigationOptions: {
  showLabel: 'false',
  tabBarLabel: '',
  tabBarIcon: ({ tintColor }) => (<MaterialIcons name='list' size={26} style={{ color: tintColor }} />)
 }
};

let mapsNav = {
 screen: EventMap,
 navigationOptions: {
  showLabel: 'false',
  tabBarLabel: '',
  tabBarIcon: ({ tintColor }) => (<Foundation name='map' size={26} style={{ color: tintColor }} />)
 }
}

let postsNav = {
 screen: Post,
 navigationOptions: {
  showLabel: 'false',
  tabBarLabel: '',
  tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-pin-outline' size={26} style={{ color: tintColor }} />)
 }
};

let exploreNav = {
 screen: Explore,
 navigationOptions: {
  showLabel: 'false',
  tabBarLabel: '',
  tabBarIcon: ({ tintColor }) => (<MaterialIcons name='explore' size={26} style={{ color: tintColor }} />)
 }
};

let profileNav = {
 screen: StackNavigator({
  Profile: {
   screen: Profile,
   navigationOptions:({navigation}) => ({
    title: "Profile",
    headerStyle: { paddingRight: 10, paddingLeft: 10 }
   })
  },
  Settings: {
   screen: Settings,
   navigationOptions: (props) => ({ title: "" })
  }
 }),
 navigationOptions: {
  showLabel: 'false',
  tabBarLabel: '',
  tabBarIcon: ({ tintColor }) => (<Ionicons name='md-person' size={26} style={{ color: tintColor }} />)
 }
}

// ====================================================================== //

export const SignedIn = TabNavigator(
 {
  Events: eventsNav,
  Maps: mapsNav,
  Post : postsNav,
  Explore: exploreNav,
  Profile:  profileNav
 },
 {
  headerMode: 'none',        // I don't want a NavBar at top
  tabBarPosition: 'top',  // So your Android tabs go bottom
  tabBarOptions: {
   activeTintColor: 'red',  // Color of tab when pressed
   inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
   showIcon: 'true', // Shows an icon for both iOS and Android
   showLabel: 'false', //No label for Android
   labelStyle: {
    fontSize: 11,
   },
   style: {
    backgroundColor: '#F5FCFF', // Makes Android tab bar white instead of standard blue
   }
  },
});


const mapStateToProps = (state) => {
 return {
  token: state.Session.token
 }
};

const AppNav = ({token}) => {
 if(token==""){
  return (
    <SignedOut />
  );
 }
 return <SignedIn />
}

export default connect(mapStateToProps)(AppNav);
