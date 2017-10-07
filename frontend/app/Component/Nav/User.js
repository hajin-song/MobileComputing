/**
* User.js
* Navigation Routing for application
*/

import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import Settings from '../User/Settings';
import Profile from '../User/Profile.js';
import Subscriptions from '../User/Subscriptions.js';
import UserView from '../User/UserView.js';

import Events from '../Event/Events.js';
import EventMap from '../Map/MapView.js';
import Event from '../Event/Event.js';
import Post from '../Post/Post.js';

import Explore from '../Explore/Explore.js';
import ExploreView from '../Explore/ExploreView.js';

import { NavStyle } from './Style';

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
  screen: StackNavigator({
    Explore: {
      screen: Explore,
      navigationOptions: ({navigation}) => ({
        showLabel: 'false'
      })
    },
    ExploreView: {
      screen: ExploreView,
      navigationOptions: (props) => ({
        title: "@username",
      })
    }
  }),
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
      navigationOptions:({navigation}) => ({ title: "@username" })
    },
    Settings: {
      screen: Settings,
      navigationOptions: (props) => ({ title: "Edit Profile" })
    },
    Subscriptions: {
      screen: Subscriptions,
      navigationOptions: (props) => ({ title: "Subscriptions" })
    },
    UserView: {
      screen: UserView,
      navigationOptions: (props) => ({ title: "Profile" })
    }
  }),
  navigationOptions: {
    showLabel: 'false',
    tabBarLabel: '',
    tabBarIcon: ({ tintColor }) => (<Ionicons name='md-person' size={26} style={{ color: tintColor }} />)
  }
}

// ====================================================================== //

export default TabNavigator(
  {
    Maps: mapsNav,
    Events: eventsNav,
    Post : postsNav,
    Explore: exploreNav,
    Profile:  profileNav
  },
  NavStyle
);
