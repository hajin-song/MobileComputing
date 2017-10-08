/**
* User.js
* Navigation Routing for application
* Created On: 29-Sept-2017
* Created By: Ha Jin Song
* Last Modified On: 07-Oct-2017
* Last Modified By: Ha Jin Song
*/

import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import UserEdit from '../User/Edit';
import UserShow from '../User/Show';
import Subscriptions from '../User/Subscriptions.js';

import EventList from '../Event/Index.js';
import EventMap from '../Map/MapView.js';
import Post from '../Post/Post.js';

import Explore from '../Explore/Explore.js';
import ExploreView from '../Explore/ExploreView.js';

import { NavStyle } from './Style';

// ===================== Navigation Components ========================== //
let eventsNav = {
  screen: StackNavigator({
    EventList: {
      screen: EventList,
      navigationOptions: ({navigation}) => ({
        title: "Events",
        headerStyle: { paddingRight: 10, paddingLeft: 10 }
      })
    },
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
    UserShow: {
      screen: UserShow,
      navigationOptions:({navigation}) => ({ title: "Profile" })
    },
    UserEdit: {
      screen: UserEdit,
      navigationOptions: (props) => ({ title: "Profile" })
    },
    Subscriptions: {
      screen: Subscriptions,
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
