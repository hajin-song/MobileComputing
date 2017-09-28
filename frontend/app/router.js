import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import Login from './Components/Auth/login.js';
import Register from './Components/Auth/register';
import Root from './Components/Auth/root';

import Settings from './Components/user/Settings';
import Profile from './Components/user/Profile.js';

import Events from './Components/event/Events.js';
import EventMap from './Components/map/MapView.js';
import Event from './Components/event/Event.js';
import Post from './Components/post/Post.js';
import Explore from './Components/users/Explore.js';
import Subscriptions from './Components/users/Subscriptions.js';
import Run from './Components/Auth/run.js';


const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
 Run: {
  screen: Run,
  navigationOptions: { }
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


export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
   {
    SignedIn: {
     screen: SignedIn,
     navigationOptions: { gesturesEnabled: false}
    },
    SignedOut: {
     screen: SignedOut,
     navigationOptions: { gesturesEnabled: false }
    }
   },
   {
    headerMode: "none",
    mode: "modal",
    initialRouteName: signedIn ? "SignedIn" : "SignedOut"
   }
  );
};
